import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

//Server error handling

process.on("SIGTERM", (err) => {
  console.log("SIGTERM detected, server is shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", (err) => {
  console.log("SIGINT detected, server is shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//unHandledRejection
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection is detected, server is shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("uncaughtException detected, server is shutting down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//unhandler rejection error
// Promise.reject(new Error("I forgot to catch this promise"));

//Uncaught Exception error
// throw new Error("I forgot to handle this local error");
