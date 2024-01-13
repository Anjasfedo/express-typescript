import express from "express"; // Importing the Express framework
import type { Request, Response } from "express"; // Importing types for Request and Response from Express
import { body, validationResult } from "express-validator"; // Importing functions for request validation from the express-validator library
import * as BookService from "./book.service"; // Importing the BookService module

export const bookRouter = express.Router(); // Creating an Express router instance

// Route to get all books
bookRouter.get("/", async (request: Request, response: Response) => {
  try {
    const books = await BookService.getBooks(); // Calling the getBooks function from BookService

    return response.status(200).json(books); // Sending a JSON response with the books and a 200 status code
  } catch (error: any) {
    return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
  }
});

// Route to get a specific book by ID
bookRouter.get("/:id", async (request: Request, response: Response) => {
  const ID: number = parseInt(request.params.id, 10); // Parsing the book ID from the request parameters

  try {
    const book = await BookService.getBookById(ID); // Calling the getBookById function from BookService

    if (book) {
      return response.status(200).json(book); // Sending a JSON response with the book and a 200 status code if found
    }

    return response.status(404).json("Book not found"); // Sending a JSON response with a 404 status code if book is not found
  } catch (error: any) {
    return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
  }
});

// Route to create a new book
bookRouter.post(
  "/",
  body("title").isString(),
  body("isFiction").isBoolean(),
  body("datePublish").isDate().isDate(),
  body("authorID").isInt(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request); // Validating the request body against specified rules

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() }); // Sending a JSON response with validation errors and a 400 status code if validation fails
    }

    try {
      const book = request.body; // Extracting the book data from the request body

      const newBook = await BookService.createBook(book); // Calling the createBook function from BookService

      return response.status(201).json(newBook); // Sending a JSON response with the new book and a 201 status code
    } catch (error: any) {
      return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
    }
  }
);

// Route to update an existing book by ID
bookRouter.put(
  "/:id",
  body("title").isString(),
  body("isFiction").isBoolean, // There is a typo here, it should be body("isFiction").isBoolean()
  body("datePublish").isDate().isDate(),
  body("authorID").isInt(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request); // Validating the request body against specified rules

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() }); // Sending a JSON response with validation errors and a 400 status code if validation fails
    }

    const ID: number = parseInt(request.params.id, 10); // Parsing the book ID from the request parameters

    try {
      const book = request.body; // Extracting the updated book data from the request body

      const updatedBook = await BookService.updateBookById(ID, book); // Calling the updateBookById function from BookService

      return response.status(201).json(updatedBook); // Sending a JSON response with the updated book and a 201 status code
    } catch (error: any) {
      return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
    }
  }
);

// Route to delete a book by ID
bookRouter.delete("/:id", async (request: Request, response: Response) => {
  const ID: number = parseInt(request.params.id, 10); // Parsing the book ID from the request parameters

  try {
    await BookService.deleteBookById(ID); // Calling the deleteBookById function from BookService

    return response.status(200).json("Book has been deleted"); // Sending a JSON response with a success message and a 200 status code
  } catch (error: any) {
    return response.status(500).json(error.message); // Handling errors and sending a JSON response with a 500 status code
  }
});
