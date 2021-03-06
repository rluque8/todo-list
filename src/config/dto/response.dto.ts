export class ResponseDto<T> {

  public code: number = 200;
  public result: T;
  public status: string = "OK";

  constructor(result: T, code?: number, status?: string) {
    this.code = code;
    this.result = result;
    this.status = status;
  }

}
