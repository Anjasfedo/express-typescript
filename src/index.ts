import * as dotenv from "dotenv"; // Importing the dotenv library to read environment variables from a .env file

import express from "express"; // Importing the Express framework for building web applications

import cors from "cors"; // Importing the CORS middleware for enabling Cross-Origin Resource Sharing

import { authorRouter } from "./author/author.router"; // Importing the authorRouter from the author module

import { bookRouter } from "./book/book.router";

dotenv.config(); // Loading environment variables from a .env file into process.env

if (!process.env.PORT) {
  process.exit(1); // If PORT environment variable is not defined, exit the process with an error code
}

const PORT: number = parseInt(process.env.PORT as string, 10); // Parsing the PORT environment variable as an integer

const app = express(); // Creating an Express application

app.use(cors()); // Enabling CORS for the Express app, allowing cross-origin requests

app.use(express.json()); // Configuring the app to parse JSON request bodies

app.use("/api/author", authorRouter); // Mounting the authorRouter at the "/api/author" route

app.use("/api/book", bookRouter); // Mounting the bookRouter at the "/api/book" route

app.listen(PORT, () => {
  console.log(`Server run on port http://localhost:${PORT}`); // Starting the Express server and logging the port on which it is running
});
