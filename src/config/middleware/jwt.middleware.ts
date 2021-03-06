import jwt from "jsonwebtoken";
import { ResponseDto } from "../dto/response.dto";
import { GENERAL_FORBIDDEN_ERROR, TOKEN_MISSING_ERROR } from "../messages/messages";

class JwtMiddleware {

  public validateToken = (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        const response = new ResponseDto<string>(TOKEN_MISSING_ERROR, 401, "ERROR");
        res.status(response.code).json(response);
      }
      const token = req.headers.authorization.split("Bearer")[1].trim();
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(decodedToken);

      return next();
    } catch (error) {
      console.log("Error", error);
      const response = new ResponseDto<string>((error && error.message) ? error.message : GENERAL_FORBIDDEN_ERROR,
                                              401,
                                              "ERROR");
      return res.status(response.code).json(response);
    }
  }
}

export default JwtMiddleware;
