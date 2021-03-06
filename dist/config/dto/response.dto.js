"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseDto {
    constructor(result, code = 200, status = "OK") {
        this.code = code;
        this.result = result;
        this.status = status;
    }
}
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map