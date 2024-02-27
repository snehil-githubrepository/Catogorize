import * as dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";

const postgresConfig = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: 5432, // Default PostgreSQL port
};

const client = new Client(postgresConfig);

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });
