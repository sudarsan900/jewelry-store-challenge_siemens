/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BASE_API_PROVIDER } from 'src/app/app-core/env-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services';
import { ILoginRequestModel, ILoginResponseModel } from '@models';

class AuthenticationServiceStub extends AuthenticationService {
  authenticate(reqData: ILoginRequestModel): Observable<ILoginResponseModel> {
    return of({
      email: 'normal@gmail.com',
      firstName: 'Normal',
      lastName: 'User',
      status: true,
      userId: 1
    } as ILoginResponseModel);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: jasmine.SpyObj<AuthenticationService>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{ path: '/app/estimation', }]
        ),
        ReactiveFormsModule,
        HttpClientTestingModule],
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: BASE_API_PROVIDER, useValue: {} },
        {
          provide: AuthenticationService,
          useClass: AuthenticationServiceStub
        },
        {
          provide: Router,
          useValue: router
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authenticationService = TestBed.get(AuthenticationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit form if form is not valid', () => {
    component.loginForm.setValue({
      userName: null,
      password: '3',
    });
    component.onSubmit();
    expect(component.loginForm.valid).toBeFalsy();

  });

  it('should submit form successfully', () => {
    spyOn(authenticationService, 'authenticate').and.returnValue(of({
      email: 'normal@gmail.com',
      firstName: 'Normal',
      lastName: 'User',
      status: true,
      userId: 1
    } as ILoginResponseModel));
    component.loginForm.setValue({
      userName: 'test',
      password: '3',
    });
    component.onSubmit();
    expect(component.loginForm.valid).toBeTruthy();

  });


  it('should be able to login on use of valid credential', () => {
    spyOn(authenticationService, 'authenticate').and.returnValue(of({
      email: 'normal@gmail.com',
      firstName: 'Normal',
      lastName: 'User',
      status: true,
      userId: 1
    } as ILoginResponseModel));
    component.loginForm.setValue({
      userName: 'test',
      password: '3',
    });
    component.onSubmit();
    expect(authenticationService.authenticate).toHaveBeenCalledWith(component.loginForm.value);

  });

  it('On Cancel form should clear', () => {
    component.loginForm.setValue({
      userName: 'test',
      password: '3',
    });
    component.cancel();
    expect(component.userName.value).toBe(null);
    expect(component.password.value).toBe(null);
  });

});
