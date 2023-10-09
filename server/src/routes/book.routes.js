import { Router } from "express";
import { getBooks,
     getBookById, 
     createdBook, 
     updatedBook, 
     deletedBook } from '../controllers/books.controller.js';

const BookRouter = Router();

BookRouter.get("/", getBooks);

BookRouter.get("/:id", getBookById);

BookRouter.post("/", createdBook);

BookRouter.put("/:id", updatedBook);

BookRouter.delete("/:id", deletedBook);

export default BookRouter;