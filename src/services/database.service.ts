import { Pool } from "pg";

export class DatabaseService {
  public db: Pool;

  // constructor() {
  // }

  public init = async () => {
    try {
      this.db = new Pool({
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT, 10),
        user: process.env.PGUSER,
      });
      await this.db.connect();
    } catch (error) {
      console.log("Error while connecting to th database");
      console.log(error);
    }
  }

  public query = async (query, params): Promise<any> => {
    const {rows} = await this.db.query(query, params);

    return rows;
  }
}

export default DatabaseService;
