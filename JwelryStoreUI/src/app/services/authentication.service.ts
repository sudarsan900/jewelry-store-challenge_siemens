import { Injectable, Injector } from '@angular/core';
import { BaseApiProvider, BASE_API_PROVIDER } from '../app-core/env-config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginRequestModel, ILoginResponseModel } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseAPIProvider: BaseApiProvider;
  constructor(
    private httpClient: HttpClient,
    private injector: Injector
  ) {
    this.baseAPIProvider = this.injector.get(BASE_API_PROVIDER);
  }

  authenticate(request: ILoginRequestModel): Observable<ILoginResponseModel> {
    return this.httpClient.post<ILoginResponseModel>(`${this.baseAPIProvider.baseApiUrl}/api/login/authenticate`, request);
  }

}
