import { db } from "../src/utils/db.server"; // Importing the Prisma client instance from the db.server module

// Type definition for Author
type Author = {
  firstName: string;
  lastName: string;
};

// Type definition for Book
type Book = {
  title: string;
  isFiction: boolean;
  datePublish: Date;
};

// Function to return an array of sample authors
const getAuthor = (): Array<Author> => {
  return [
    { firstName: "Anjas", lastName: "Fedo" },
    { firstName: "Fedo", lastName: "Anjas" },
    { firstName: "Go", lastName: "Lang" },
  ];
};

// Function to return an array of sample books
const getBook = (): Array<Book> => {
  return [
    { title: "Sapi", isFiction: false, datePublish: new Date() },
    { title: "Ayam", isFiction: true, datePublish: new Date() },
    { title: "Geprek", isFiction: true, datePublish: new Date() },
  ];
};

// Seed function to populate the database with sample data
const seed = async () => {
  // Creating authors in the database using the Prisma client
  await Promise.all(
    getAuthor().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );

  // Finding an author in the database based on the first name
  const author = await db.author.findFirst({
    where: {
      firstName: "Anjas",
    },
  });

  // Checking if the author is found
  if (!author) {
    console.error("Author not found");
    return;
  }

  // Creating books in the database associated with the found author
  await Promise.all(
    getBook().map((book) => {
      const { title, isFiction, datePublish } = book;

      return db.book.create({
        data: {
          title,
          isFiction,
          datePublish,
          authorID: author.ID,
        },
      });
    })
  );
};

// Calling the seed function to populate the database with sample data
seed();
