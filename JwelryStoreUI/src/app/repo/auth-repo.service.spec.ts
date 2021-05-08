/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AuthRepoService } from './auth-repo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ILoginResponseModel } from '@models';

describe('Service: AuthRepo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthRepoService]
    });
  });

  it('should ...', inject([AuthRepoService], (service: AuthRepoService) => {
    expect(service).toBeTruthy();
  }));

  it('getCurrentUser should return current user data', inject([AuthRepoService], (service: AuthRepoService) => {
    const user = {
      email: 'normal@gmail.com',
      firstName: 'Normal',
      lastName: 'User',
      status: true,
      userId: 1
    } as ILoginResponseModel;
    service.storeLoginData(user);
    const cuser = service.getCurrentUser();
    expect(cuser).toEqual(user);
  }));

  it('logout should clear userinfo and should return null', inject([AuthRepoService], (service: AuthRepoService) => {
    const user = {
      email: 'normal@gmail.com',
      firstName: 'Normal',
      lastName: 'User',
      status: true,
      userId: 1
    } as ILoginResponseModel;
    service.storeLoginData(user);
    service.logOut();

    expect(service.getCurrentUser()).toBeNull();
  }));

});
