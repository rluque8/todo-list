import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Pool } from "pg";
import DatabaseService from "./services/database.service";

class App {

  public app: express.Application;
  public port: number;
  public client: Pool;
  public dbService: DatabaseService;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;
    this.dbService = new DatabaseService();
    dotenv.config();

    this.connectToDb();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.setUpCors();
  }

  public listen = () => {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port: ${this.port}`);
    });
  }

  private initializeMiddlewares = () => {
    this.app.use(bodyParser.json());
  }

  private setUpCors = () => {
    this.app.use(cors());
  }

  private initializeControllers = (controllers) => {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  private connectToDb = async () => {
    await this.dbService.init();
  }
}

export default App;
