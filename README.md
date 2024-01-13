# Express TypeScript CRUD API

This project is a simple RESTful API built using Express.js, TypeScript, and Prisma, implementing CRUD operations (Create, Read, Update, Delete).

## Getting Started

Follow these steps to run the project locally:

1. **Install Dependencies:**

```bash
npm install
```

2. **Create database:**

```bash
npx prisma db push
```

3. **Run database seed:**

```bash
npx prisma db seed
```

4. **Start development server:**

```bash
npm run dev
```

These steps will install the necessary dependencies, create the database schema, seed the database with initial data, and start the development server on port 8000.

## API Endpoints

### Author:

- GET /api/author: Retrieve all author.
- GET /api/author/:id: Retrieve an author by ID.
- POST /api/author: Create a new author.
- PUT /api/author/:id: Update an author by ID.
- DELETE /api/author/:id: Delete an author by ID

### Book:

- GET /api/book: Retrieve all book.
- GET /api/book/:id: Retrieve an book by ID.
- POST /api/book: Create a new book.
- PUT /api/book/:id: Update an book by ID.
- DELETE /api/book/:id: Delete an book by ID

The API Postman Collection is available in the /postman-collection/ directory.

## Closing Notes

If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

Happy coding!
