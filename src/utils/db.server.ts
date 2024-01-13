import { PrismaClient } from "@prisma/client"; // Importing the PrismaClient from the Prisma client library

let db: PrismaClient; // Declaring a variable db of type PrismaClient

declare global {
  var __db: PrismaClient | undefined; // Declaring a global variable __db of type PrismaClient or undefined
}

if (!global.__db) {
  global.__db = new PrismaClient(); // Creating a new instance of PrismaClient if __db is not already defined in the global scope
}

db = global.__db; // Assigning the global PrismaClient instance to the local variable db

export { db }; // Exporting the db variable for use in other modules
