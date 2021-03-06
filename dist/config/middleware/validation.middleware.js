"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_dto_1 = require("../dto/response.dto");
class ValidationMiddleware {
    constructor() {
        this.validateQueryParams = (schema) => {
            return (req, res, next) => {
                // Validate the query params received with the schema created
                const error = this.validateObjectSchema(req.query, schema);
                if (error) {
                    const response = new response_dto_1.ResponseDto(error, 400, "ERROR");
                    return res.status(response.code).json(response);
                }
                return next();
            };
        };
        this.validateBody = (schema) => {
            return (req, res, next) => {
                // Validate the body received with the schema created
                const error = this.validateObjectSchema(req.body, schema);
                if (error) {
                    const response = new response_dto_1.ResponseDto(error, 400, "ERROR");
                    return res.status(response.code).json(response);
                }
                return next();
            };
        };
        this.validateObjectSchema = (data, schema) => {
            const result = schema.validate(data, { convert: false });
            if (result.error) {
                const errorDetails = result.error.details.map((value) => value.message);
                return errorDetails;
            }
            return null;
        };
    }
}
exports.default = ValidationMiddleware;
//# sourceMappingURL=validation.middleware.js.map