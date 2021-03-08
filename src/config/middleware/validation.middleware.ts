import { ResponseDto } from "../dto/response.dto";

class ValidationMiddleware {

  public validateQueryParams = (schema) => {
    return (req, res, next) => {
      // Validate the query params received with the schema created
      const error = this.validateObjectSchema(req.query, schema);

      if (error) {
        const response = new ResponseDto<string>(error, 400, "ERROR");
        return res.status(response.code).json(response);
      }
      return next();
    };
  }

  public validateBody = (schema) => {
    return (req, res, next) => {
      // Validate the body received with the schema created
      const error = this.validateObjectSchema(req.body, schema);
      if (error) {
        const response = new ResponseDto<string>(error, 400, "ERROR");
        return res.status(response.code).json(response);
      }
      return next();
    };
  }

  public validateObjectSchema = (data, schema) => {
    const result = schema.validate(data, { convert: false });

    if (result.error) {
      const errorDetails = result.error.details.map((value: any) => value.message);
      return errorDetails;
    }
    return null;
  }

}

export default ValidationMiddleware;
