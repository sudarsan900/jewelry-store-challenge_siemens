import { TestBed, inject } from '@angular/core/testing';
import { BASE_API_PROVIDER } from '../app-core/env-config';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from '@services';
import { ILoginRequestModel } from '@models';

describe('Service: Authentication', () => {

  let authenticationService: jasmine.SpyObj<AuthenticationService>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule
      ],
      providers: [
        AuthenticationService,
        {
          provide: BASE_API_PROVIDER, useValue: {
            baseApiUrl: 'jwelrystore'
          }
        }
      ]
    });
    authenticationService = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('should ...', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('should authenticate', () => {
    expect(authenticationService).toBeTruthy();
    const loginRequest = {
      userName: 'test',
      password: '123'
    } as ILoginRequestModel;
    authenticationService.authenticate(loginRequest).subscribe(response => {
    });
    const request = httpMock.expectOne(`jwelrystore/api/login/authenticate`);
    expect(request.request.method).toBe('POST');
    request.flush({});
    httpMock.verify();
  });

});
