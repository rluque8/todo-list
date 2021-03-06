"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseDto {
    constructor(result, code, status) {
        this.code = 200;
        this.status = "OK";
        this.code = code;
        this.result = result;
        this.status = status;
    }
}
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map