import { IBaseApiResponse } from './base-api-response';

export interface ILoginResponseModel extends IBaseApiResponse {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
    userId: number;
}
