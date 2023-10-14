import { Book } from "../models/book.js";

export const getAllBooks = async (_req, res) => {
    try {
        const books = await Book.find().populate({
            path: 'author',
            select: 'name',
        })
        .populate({
            path: 'genre',
            select: 'name',
        });

        if(books.length === 0) {
            return ({
                message: 'Books not found',
            });
        }
        return books;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getBook = async (bookId) => {
    try {
        const book = await Book.findById(bookId).populate({
            path: 'author',
            select: 'name',
        })
        .populate({
            path: 'genre',
            select: 'name',
        });

        if(!book) {
            return ({
                message: 'Book not found',
            });
        }
        return book;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const createBook = async (book) => {
    try {

        const existingBook = await Book.findOne({ title: book.title });
        if (existingBook) {
            return ('Book already exists');
        }
        const newBook = await Book.create(book);
        return newBook;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const updateBook = async (bookId, book) => {
    try {
        const existingBook = await Book.findById(bookId);
        if (!existingBook) {
          return null; 
        }
    
      
        existingBook.title = book.title;
        existingBook.genre = book.genre;
        existingBook.year_publication = book.year_publication;
        existingBook.front_page = book.front_page;
        existingBook.author = book.author;
    
        
        const updatedBook = await existingBook.save();
    
        return updatedBook; 
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    };
export const deleteBook = async (bookId) => {
    try {

        const book = await Book.findById(bookId);
        if (!book) {
            return ({
                message: 'Book not found',
            });
        }
        const deletedBook = await Book.findByIdAndDelete(bookId);
        return deletedBook;
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};