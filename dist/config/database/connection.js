"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    // password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT, 10),
    user: process.env.PGUSER,
});
//# sourceMappingURL=connection.js.map