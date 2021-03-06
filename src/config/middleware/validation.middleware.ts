import { ResponseDto } from "../dto/response.dto";

class ValidationMiddleware {

  public validateQueryParams = (schema) => {
    return (req, res, next) => {
      const error = this.validateObjectSchema(req.query, schema);
      if (error) {
        const response = new ResponseDto<string>(error, "ERROR");
        return res.status(400).json(response);
      }
      return next();
    };
  }

  public validateBody = (schema) => {
    return (req, res, next) => {
      const error = this.validateObjectSchema(req.body, schema);
      if (error) {
        const response = new ResponseDto<string>(error, "ERROR");
        return res.status(400).json(response);
      }
      return next();
    };
  }

  private validateObjectSchema = (data, schema) => {
    const result = schema.validate(data, { convert: false });
    if (result.error) {
      const errorDetails = result.error.details.map((value: any) => value.message);
      return errorDetails;
    }
    return null;
  }

}

export default ValidationMiddleware;
