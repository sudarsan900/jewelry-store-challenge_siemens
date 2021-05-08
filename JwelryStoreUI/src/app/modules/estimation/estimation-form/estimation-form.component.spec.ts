/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationFormComponent } from './estimation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BASE_API_PROVIDER } from 'src/app/app-core/env-config';
import { of } from 'rxjs';
import { PrintToScreeModalComponent } from '../print-to-scree-modal/print-to-scree-modal.component';
import { AuthRepoService } from '@repos';
import { IDiscountResponseModel, ILoginResponseModel } from '@models';
import { EstimationService } from '@services';

class AuthRepoServiceStub extends AuthRepoService {
  getCurrentUser() {
    return {
      email: 'privileged@gmail.com',
      firstName: 'Privileged',
      lastName: 'User',
      status: true,
      userId: 1,
      role: 'privileged'
    } as ILoginResponseModel;
  }
}

// Mock class for NgbModalRef
export class MockNgbModalRef {
  componentInstance = {
    prompt: undefined,
    title: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}

describe('EstimationFormComponent', () => {
  let component: EstimationFormComponent;
  let fixture: ComponentFixture<EstimationFormComponent>;
  let authRepoService: jasmine.SpyObj<AuthRepoService>;
  let estimationService: jasmine.SpyObj<EstimationService>;
  let ngbModal: NgbModal;
  let mockModalRef = new MockNgbModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgbModule],
      declarations: [EstimationFormComponent],
      providers: [
        { provide: BASE_API_PROVIDER, useValue: {} },
        { provide: AuthRepoService, useClass: AuthRepoServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationFormComponent);
    authRepoService = TestBed.get(AuthRepoService);
    estimationService = TestBed.get(EstimationService);
    component = fixture.componentInstance;
    ngbModal = TestBed.get(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be able to submit invalid form', () => {
    component.estimationForm.setValue({
      goldPrice: null,
      weight: null,
      totalPrice: null,
      discount: null
    });
    component.calculate();
    expect(component.estimationForm.valid).toBeFalsy();
  });

  it('should be able to submit form successfully', () => {
    component.estimationForm.setValue({
      goldPrice: '10',
      weight: '10',
      totalPrice: null,
      discount: null
    });
    component.calculate();
    expect(component.estimationForm.valid).toBeTruthy();
  });

  it('On calculate click should estimate the price', () => {
    component.estimationForm.setValue({
      goldPrice: '10',
      weight: '10',
      totalPrice: null,
      discount: null
    });
    component.calculate();
    expect(component.totalPrice.value).toEqual(100);
  });

  it('If has discount it should estimate the price after discount', () => {
    component.estimationForm.setValue({
      goldPrice: '10',
      weight: '10',
      totalPrice: null,
      discount: '2'
    });
    component.calculate();
    expect(component.totalPrice.value).toEqual(98);
  });

  it('Should get discount data from api', () => {
    spyOn(estimationService, 'getDiscount').and.returnValues(of({
      discount: 2,
      status: true
    } as IDiscountResponseModel));
    component.getDiscount();
    expect(estimationService.getDiscount).toHaveBeenCalled();
    expect(component.discount.value).toEqual(2);
  });

  it('Print to paper should not proceed if form is invalid', () => {
    spyOn(component, 'calculate').and.returnValues(false);
    component.estimationForm.reset();
    component.printToPaper();
    expect(component.calculate).toHaveBeenCalled();
  });

  it('Print to file should not proceed if form is invalid', () => {
    spyOn(component, 'calculate').and.returnValues(false);
    component.estimationForm.reset();
    component.printToFile();
    expect(component.calculate).toHaveBeenCalled();
  });

  it('Print to screen should not proceed if form is invalid', () => {
    spyOn(component, 'calculate').and.returnValues(false);
    component.estimationForm.reset();
    component.printToScreen();
    expect(component.calculate).toHaveBeenCalled();
  });

  it('Should throw not implemented exception on Print to paper', () => {
    component.estimationForm.setValue({
      goldPrice: '10',
      weight: '10',
      totalPrice: null,
      discount: '2'
    });
    expect(() => component.printToPaper()).toThrow(new Error('Functionality not implemented.'));
  });

  it('Onclose click form should reset', () => {
    component.estimationForm.setValue({
      goldPrice: '10',
      weight: '10',
      totalPrice: null,
      discount: '2'
    });
    component.close();
    expect(component.goldPrice.value).toBeNull();
  });

  it('Print to screen should open popup', () => {
    component.estimationForm.setValue({
      goldPrice: '10',
      weight: '10',
      totalPrice: null,
      discount: '2'
    });
    spyOn(ngbModal, 'open').and.returnValue(mockModalRef as any);
    component.printToScreen();
    expect(ngbModal.open).toHaveBeenCalledWith(PrintToScreeModalComponent);
  });

  it('Print to screen should download pdf', () => {
    component.estimationForm.setValue({
      goldPrice: '10',
      weight: '10',
      totalPrice: null,
      discount: '2'
    });
    const blob = new Blob([''], { type: 'application/pdf' });
    spyOn(estimationService, 'printToFile').and.returnValue(of(blob));
    component.printToFile();
    const req = component.getFormValue();
    expect(estimationService.printToFile).toHaveBeenCalledWith(req);
  });

});
