import { Author } from "../models/author.js";
import { Book } from '../models/book.js';

export const getAllAuthors = async (_req, res) => {
    try {
        const authors = await Author.find().populate({
            path: 'books',
            select: 'title genre',
        });

        if (authors.length === 0) {
            return res.status(404).json({
                message: 'Authors not found',
            });
        }
        return authors;
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getAuthor = async (authorId, res) => {
    try {
        const author = await Author.findById(authorId).populate({
            path: 'books',
            select: 'title genre',
        });

        if (!author) {
            return res.status(404).json({
                message: 'Author not found',
            });
        }

        return author;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


export const createAuthor = async (author, res ) => {
    try {

        const existingAuthor = await Author.findOne({ name: author.name });
        if (existingAuthor) {
            return ('Author already exists');
        }

        const newAuthor = await Author.create(author);

        return newAuthor;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


export const updateAuthor = async (authorId, author, res) => {
    try {

        const existingAuthor = await Author.findById(authorId);
        if (!existingAuthor) {
            throw new Error('Author not found');
        }

        const updatedAuthor = await Author.findByIdAndUpdate(authorId, author);
        if (!updatedAuthor) {
            return res.status(404).json({
                message: 'Author not found',
            });
        }

        return updatedAuthor;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const deleteAuthor = async (authorId, res) => {
    try {
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({
                message: 'Author not found',
            });
        }

        const deletedAuthor = await Author.findByIdAndDelete(authorId);

        return (deletedAuthor);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};