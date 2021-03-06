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
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_service_1 = __importDefault(require("./services/database.service"));
class App {
    constructor(controllers, port) {
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
        this.initializeControllers = (controllers) => {
            controllers.forEach((controller) => {
                this.app.use("/api/v1" + controller.path, controller.router);
            });
        };
        this.connectToDb = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_service_1.default.connect();
                console.log("Database connected successfully!");
            }
            catch (error) {
                console.log("Error while connecting to the database");
                console.log(error);
                throw new Error(error);
            }
        });
        this.app = express_1.default();
        this.port = port;
        dotenv_1.default.config();
        this.connectToDb();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.setUpCors();
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map