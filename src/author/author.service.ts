import { db } from "../utils/db.server"; // Importing the Prisma client instance from the db.server module

// Type definition for the Author entity
type Author = {
  ID: number;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updateAt: Date;
};

// Function to retrieve all authors from the database
export const getAuthors = async (): Promise<Author[]> => {
  return db.author.findMany({
    select: {
      ID: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updateAt: true,
    },
  });
};

// Function to retrieve a specific author by ID from the database
export const getAuthorById = async (ID: number): Promise<Author | null> => {
  return db.author.findUnique({
    where: {
      ID, // Same as ID: ID, but can be shortened
    },
    select: {
      ID: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updateAt: true,
    },
  });
};

// Function to create a new author in the database
export const createAuthor = async (
  author: Omit<Author, "ID">
): Promise<Author> => {
  const { firstName, lastName } = author;

  return db.author.create({
    data: {
      firstName,
      lastName,
    },
    select: {
      ID: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updateAt: true,
    },
  });
};

// Function to update an existing author by ID in the database
export const updateAuthorById = async (
  ID: number,
  author: Omit<Author, "ID">
): Promise<Author> => {
  const { firstName, lastName } = author;

  return db.author.update({
    where: {
      ID,
    },
    data: {
      firstName,
      lastName,
    },
    select: {
      ID: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updateAt: true,
    },
  });
};

// Function to delete an author by ID from the database
export const deleteAuthorById = async (ID: number): Promise<void> => {
  await db.author.delete({
    where: {
      ID,
    },
  });
};
