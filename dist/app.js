"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const connection_1 = __importDefault(require("./config/database/connection"));
const queries_1 = require("./config/database/queries");
const swagger_file_1 = require("./config/swagger/swagger-file");
class App {
    constructor(controllers, port) {
        this.apiPath = "/api/v1";
        this.listen = () => {
            this.app.listen(this.port, () => {
                console.log(`Server listening on port: ${this.port}`);
            });
        };
        this.initializeMiddlewares = () => {
            this.app.use(body_parser_1.default.json());
        };
        this.setUpCors = () => {
            this.app.use(cors_1.default());
        };
        this.initSwagger = () => {
            // Defined the endpoint to see the Swagger documentation with endpoints
            this.app.use(this.apiPath + "/api-docs", swaggerUi.serve, swaggerUi.setup(swagger_file_1.swaggerJson));
        };
        this.initializeControllers = (controllers) => {
            // Initialize all controllers with its corresponding route
            controllers.forEach((controller) => {
                this.app.use(this.apiPath + controller.path, controller.router);
            });
        };
        this.connectToDb = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to the postgres database
                yield connection_1.default.connect();
                console.log("Database connected successfully!");
                yield this.initDb();
            }
            catch (error) {
                console.log("Error while connecting to the database");
                console.log(error);
                throw new Error(error);
            }
        });
        this.initDb = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield connection_1.default.connect();
                yield client.query(queries_1.QUERY_INIT_TABLES);
                client.release();
            }
            catch (error) {
                console.log("Error initializing database");
                console.log(error);
                throw new Error(error);
            }
        });
        this.app = express_1.default();
        this.port = port;
        dotenv_1.default.config();
        this.connectToDb();
        this.initializeMiddlewares();
        this.initSwagger();
        this.initializeControllers(controllers);
        this.setUpCors();
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map