import { Author } from "../author/author.service";
import { db } from "../utils/db.server";

type BookRead = {
  ID: number;
  title: string;
  isFiction: boolean;
  datePublish: Date;
  author: Author;
  // authorID: number;
  createdAt: Date;
  updatedAt: Date;
};

type BookWrite = {
  title: string;
  isFiction: boolean;
  datePublish: Date;
  authorID: number;
};

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
      // authorID: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

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

const createBook = async (book: BookWrite): Promise<BookRead> => {
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

export const updateBookById = async (
  ID: number,
  book: BookWrite
): Promise<BookRead> => {
  const { title, isFiction, datePublish, authorID } = book;

  return db.book.update({
    where: {
      ID,
    },
    data: {
      title,
      isFiction,
      datePublish,
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

const deleteBookById = async (ID: number): Promise<void> => {
  await db.book.delete({
    where: {
      ID,
    },
  });
};
