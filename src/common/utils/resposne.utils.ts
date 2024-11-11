export interface IHttpResponse {
  status: number;
  code: string;
  message?: any;
  data?: any;
  count?: number;

  SuccessReponse(data: any, httpStatus: number): this;
  InternalErrorResponse(error: any): this;
  BadRequestResponse(error: any): this;
  getStatus(): number;
  getResponse(): IHttpResponse;
}

export class HttpResponse implements IHttpResponse {
  status: number;
  code: string;
  message?: any;
  data?: any;
  count?: number;

  SuccessReponse(data: any, httpStatus: number): this {
    this.status = httpStatus;
    this.code = httpStatus.toString();
    this.data = data;
    return this;
  }

  InternalErrorResponse(error: any): this {
    this.status = 500;
    this.code = '500';
    this.message = error;
    return this;
  }

  BadRequestResponse(error: any): this {
    this.status = 400;
    this.code = '400';
    this.message = error;
    return this;
  }

  getStatus(): number {
    return this.status;
  }

  getResponse(): IHttpResponse {
    return this;
  }
}

export class ResponseUtils {
  static Reponse(data: any, httpStatus: number): IHttpResponse {
    return new HttpResponse().SuccessReponse(data, httpStatus);
  }

  static InternalErrorResponse(error: any): IHttpResponse {
    return new HttpResponse().InternalErrorResponse(error);
  }

  static BadRequestResponse(error: any): IHttpResponse {
    return new HttpResponse().BadRequestResponse(error);
  }
}
