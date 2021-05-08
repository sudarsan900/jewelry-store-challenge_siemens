
/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BASE_API_PROVIDER } from '../app-core/env-config';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EstimationService } from '@services';
import { IEstimationModel } from '@models';

describe('Service: Estimation', () => {
  let estimationService: jasmine.SpyObj<EstimationService>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BASE_API_PROVIDER, useValue: {
            baseApiUrl: 'jwelrystore'
          }
        },
        EstimationService],
    });
    estimationService = TestBed.get(EstimationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should ...', inject([EstimationService], (service: EstimationService) => {
    expect(service).toBeTruthy();
  }));

  it('should getDiscount', () => {
    expect(estimationService).toBeTruthy();
    estimationService.getDiscount().subscribe(response => {
    });
    const request = httpMock.expectOne(`jwelrystore/api/estimation/getDiscount`);
    expect(request.request.method).toBe('GET');
    request.flush({});
    httpMock.verify();
  });

  it('should get PDF', () => {
    const req = {
      goldPrice: 10,
      weight: 10,
      discount: 2,
      totalPrice: 98
    } as IEstimationModel;
    expect(estimationService).toBeTruthy();
    estimationService.printToFile(req).subscribe(response => {
    });
    const request = httpMock.expectOne(`jwelrystore/api/estimation/printToFile`);
    expect(request.request.method).toBe('POST');
    const blob = new Blob([''], { type: 'application/pdf' });
    request.flush(blob);
    httpMock.verify();
  });

});
