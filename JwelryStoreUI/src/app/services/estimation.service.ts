import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiProvider, BASE_API_PROVIDER } from '../app-core/env-config';
import { IEstimationModel } from '../models/estimation-model';
import { Observable } from 'rxjs';
import { DiscountResponseModel } from '../models/discount-response-model';

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


  getDiscount(): Observable<DiscountResponseModel> {
    return this.httpClient.get<DiscountResponseModel>(`${this.baseAPIProvider.baseApiUrl}/api/estimation/getDiscount`);
  }

}
