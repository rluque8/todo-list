export class ResponseDto<T> {

  public code: number;
  public result: T;
  public status: string;

  constructor(result: T, code: number = 200, status: string = "OK") {
    this.code = code;
    this.result = result;
    this.status = status;
  }

}
