import express from "express";

import type { Request, Response } from "express";

import { body, validationResult } from "express-validator";

import * as BookService from "./book.service";

export const bookRouter = express.Router();

bookRouter.get("/", async (request: Request, response: Response) => {
  try {
    const books = await BookService.getBooks();

    return response.status(200).json(books);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});


