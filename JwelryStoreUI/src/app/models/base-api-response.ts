export interface IBaseApiResponse {
    status: boolean;
    statusId: number;
    statusCode: string;
    httpStatusCode: number;
    message: string;
    messages: string[];
}
