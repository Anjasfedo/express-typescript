import express from "express"; // Importing the Express framework
import type { Request, Response } from "express"; // Importing types for Request and Response from Express
import { body, validationResult } from "express-validator"; // Importing functions for request validation from the express-validator library
import * as AuthorService from "./author.service"; // Importing the AuthorService module

export const authorRouter = express.Router(); // Creating an Express router instance

// Route to get all authors
authorRouter.get("/", async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.getAuthors(); // Calling the getAuthors function from AuthorService

    return response.status(200).json(authors); // Sending a JSON response with the authors and a 200 status code
  } catch (error: any) {
    return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
  }
});

// Route to get a specific author by ID
authorRouter.get("/:id", async (request: Request, response: Response) => {
  const ID: number = parseInt(request.params.id, 10); // Parsing the author ID from the request parameters

  try {
    const author = await AuthorService.getAuthorById(ID); // Calling the getAuthorById function from AuthorService

    if (author) {
      return response.status(200).json(author); // Sending a JSON response with the author and a 200 status code if found
    }

    return response.status(404).json("Author not found"); // Sending a JSON response with a 404 status code if author is not found
  } catch (error: any) {
    return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
  }
});

// Route to create a new author
authorRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request); // Validating the request body against specified rules

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() }); // Sending a JSON response with validation errors and a 400 status code if validation fails
    }

    try {
      const author = request.body; // Extracting the author data from the request body

      const newAuthor = await AuthorService.createAuthor(author); // Calling the createAuthor function from AuthorService

      return response.status(200).json(newAuthor); // Sending a JSON response with the new author and a 200 status code
    } catch (error: any) {
      return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
    }
  }
);

// Route to update an author by ID
authorRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request); // Validating the request body against specified rules

    if (!errors.isEmpty) {
      return response.status(400).json({ errors: errors.array() }); // Sending a JSON response with validation errors and a 400 status code if validation fails
    }

    const ID: number = parseInt(request.params.id, 10); // Parsing the author ID from the request parameters

    try {
      const author = request.body; // Extracting the updated author data from the request body

      const updatedAuthor = await AuthorService.updateAuthorById(ID, author); // Calling the updateAuthorById function from AuthorService

      return response.status(200).json(updatedAuthor); // Sending a JSON response with the updated author and a 200 status code
    } catch (error: any) {
      return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
    }
  }
);

// Route to delete an author by ID
authorRouter.delete("/:id", async (request: Request, response: Response) => {
  const ID: number = parseInt(request.params.id, 10); // Parsing the author ID from the request parameters

  try {
    await AuthorService.deleteAuthorById(ID); // Calling the deleteAuthorById function from AuthorService

    return response.status(200).json("Author has been deleted"); // Sending a JSON response with a success message and a 200 status code
  } catch (error: any) {
    return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
  }
});
