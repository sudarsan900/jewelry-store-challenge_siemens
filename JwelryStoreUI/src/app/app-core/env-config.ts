import { environment } from 'src/environments/environment';
import { InjectionToken } from '@angular/core';


export interface BaseApiProvider {
  baseApiUrl: string;
}

export const baseProvider: BaseApiProvider = {
  baseApiUrl: environment.baseApiUrl
};

export const BASE_API_PROVIDER = new InjectionToken<BaseApiProvider>(
  'BASE_API_PROVIDER'
);