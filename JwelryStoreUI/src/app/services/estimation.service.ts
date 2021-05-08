import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiProvider, BASE_API_PROVIDER } from '../app-core/env-config';
import { Observable } from 'rxjs';
import { IDiscountResponseModel, IEstimationModel } from '@models';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  private baseAPIProvider: BaseApiProvider;
  constructor(
    private httpClient: HttpClient,
    private injector: Injector
  ) {
    this.baseAPIProvider = this.injector.get(BASE_API_PROVIDER);
  }

  printToFile(requestData: IEstimationModel) {
    return this.httpClient.post(`${this.baseAPIProvider.baseApiUrl}/api/estimation/printToFile`, requestData, { responseType: 'blob' });
  }


  getDiscount(): Observable<IDiscountResponseModel> {
    return this.httpClient.get<IDiscountResponseModel>(`${this.baseAPIProvider.baseApiUrl}/api/estimation/getDiscount`);
  }

}
