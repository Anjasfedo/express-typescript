import { db } from "../src/utils/db.server";

type Author = {
  firstName: string;
  lastName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublish: Date;
};

async function seed() {
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

  const author = await db.author.findFirst({
    where: {
      firstName: "Anjas",
    },
  });

  if (!author) {
    console.error("Author not found");
    return;
  }

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
}

seed();

const getAuthor = (): Array<Author> => {
  return [
    {
      firstName: "Anjas",
      lastName: "Fedo",
    },
    {
      firstName: "Fedo",
      lastName: "Anjas",
    },
    {
      firstName: "Go",
      lastName: "Lang",
    },
  ];
};

const getBook = (): Array<Book> => {
  return [
    {
      title: "Sapi",
      isFiction: false,
      datePublish: new Date(),
    },
    {
      title: "Ayam",
      isFiction: true,
      datePublish: new Date(),
    },
    {
      title: "Geprek",
      isFiction: true,
      datePublish: new Date(),
    },
  ];
};
