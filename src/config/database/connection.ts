import { Pool } from "pg";

export default new Pool({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  // password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT, 10),
  user: process.env.PGUSER,
});
