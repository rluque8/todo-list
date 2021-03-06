export class ResponseDto<T> {

  public result: T;
  public status: string = "OK";

  constructor(result: T, status?: string) {
      this.status = status;
      this.result = result;
  }

}
