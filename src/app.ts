import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pool from "./config/database";

class App {

  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;
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

    // Initialize all controllers with its corresponding route
    controllers.forEach((controller) => {
      this.app.use("/api/v1" + controller.path, controller.router);
    });
  }

  private connectToDb = async () => {
    try {
      // Connect to the postgres database
      await pool.connect();
      console.log("Database connected successfully!");
    } catch (error) {
      console.log("Error while connecting to the database");
      console.log(error);
      throw new Error(error);
    }
  }
}

export default App;
