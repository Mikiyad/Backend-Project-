import "dotenv/config";
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { RouterInitalizor } from "./routes/InitalizorRouter";
import config from "config";
import cors from "cors";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

// const host = config.get("dbConfig");
const host: PostgresConnectionOptions = config.get("dbConfig");

createConnection(host)
  .then(() => {
    console.log("DB Connected");
    const app = express();
    // app.use(express.json());
    app.use(cors());

    app.use(express.json({ limit: "10000mb" }));
    app.use(express.urlencoded({ limit: "10000mb", extended: true }));
    app.get("/", (req: Request, res: Response) => {
      console.log("API");
      res.send("API Working");
    });
    app.use("/api", RouterInitalizor);
    const swaggerOptions = {
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "API Documentation",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
      apis: ["src/routes/*.ts"],
    };

    const swaggerDocs = swaggerJsdoc(swaggerOptions);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(2119);
    console.log("Server listening fine");
  })
  .catch((error: any) => console.log(error));
