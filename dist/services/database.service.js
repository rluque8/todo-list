"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class DatabaseService {
    constructor() {
        // constructor() {
        // }
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.db = new pg_1.Pool({
                    database: process.env.PGDATABASE,
                    host: process.env.PGHOST,
                    password: process.env.PGPASSWORD,
                    port: parseInt(process.env.PGPORT, 10),
                    user: process.env.PGUSER,
                });
                yield this.db.connect();
            }
            catch (error) {
                console.log("Error while connecting to th database");
                console.log(error);
            }
        });
        this.query = (query, params) => __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield this.db.query(query, params);
            return rows;
        });
    }
}
exports.DatabaseService = DatabaseService;
exports.default = DatabaseService;
//# sourceMappingURL=database.service.js.map