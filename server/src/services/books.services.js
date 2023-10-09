import { Book } from "../models/book.js";

export const getAllBooks = async () => {
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
            return res.status(404).json({
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
            return res.status(404).json({
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
            return res.status(404).json({
                message: 'Book not found',
            });
        }
        const updatedBook = await Book.findByIdAndUpdate(bookId, book);
        return updatedBook;
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const deleteBook = async (bookId) => {
    try {

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
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