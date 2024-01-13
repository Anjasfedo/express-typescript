import { Author } from "../author/author.service"; // Importing the Author type from the author.service module
import { db } from "../utils/db.server"; // Importing the Prisma client instance from the db.server module

// Type definition for the BookRead entity
type BookRead = {
  ID: number;
  title: string;
  isFiction: boolean;
  datePublish: Date;
  author: Author; // Embedding Author type to represent the associated author details
  // authorID: number; // Not used, as we provide the complete author details in the 'author' property
  createdAt: Date;
  updatedAt: Date;
};

// Type definition for the BookWrite entity
type BookWrite = {
  title: string;
  isFiction: boolean;
  datePublish: Date;
  authorID: number;
};

// Function to retrieve all books from the database with associated author details
export const getBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select: {
      ID: true,
      title: true,
      isFiction: true,
      datePublish: true,
      author: {
        select: {
          ID: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Function to retrieve a specific book by ID from the database with associated author details
export const getBookById = async (ID: number): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: {
      ID,
    },
    select: {
      ID: true,
      title: true,
      isFiction: true,
      datePublish: true,
      author: {
        select: {
          ID: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Function to create a new book in the database
export const createBook = async (book: BookWrite): Promise<BookRead> => {
  const { title, authorID, isFiction, datePublish } = book;

  const parseDate: Date = new Date(datePublish);

  return db.book.create({
    data: {
      title,
      isFiction,
      datePublish: parseDate,
      authorID,
    },
    select: {
      ID: true,
      title: true,
      isFiction: true,
      datePublish: true,
      author: {
        select: {
          ID: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Function to update an existing book by ID in the database
export const updateBookById = async (
  ID: number,
  book: BookWrite
): Promise<BookRead> => {
  const { title, isFiction, datePublish, authorID } = book;

  const parseDate: Date = new Date(datePublish);

  return db.book.update({
    where: {
      ID,
    },
    data: {
      title,
      isFiction,
      datePublish: parseDate,
      authorID,
    },
    select: {
      ID: true,
      title: true,
      isFiction: true,
      datePublish: true,
      author: {
        select: {
          ID: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Function to delete a book by ID from the database
export const deleteBookById = async (ID: number): Promise<void> => {
  await db.book.delete({
    where: {
      ID,
    },
  });
};
