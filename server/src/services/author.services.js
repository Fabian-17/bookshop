import { Author } from "../models/author.js";

export const getAllAuthors = async () => {
    try {
        const authors = await Author.find().populate({
            path: 'books',
            select: 'title genre',
        })
        .populate({
            path: 'genre',
            select: 'name',
        });

        if (authors.length === 0) {
            return res.status(404).json({
                message: 'Authors not found',
            });
        }
        return res.status(200).json(authors);
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getAuthor = async (authorId) => {
    try {
        const author = await Author.findById(authorId).populate({
            path: 'books',
            select: 'title genre',
        })
        .populate({
            path: 'genre',
            select: 'name',
        });

        if (!author) {
            return res.status(404).json({
                message: 'Author not found',
            });
        }

        return res.status(200).json(author);

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


export const createAuthor = async (author) => {
    try {

        const existingAuthor = await Author.findOne({ name: author.name });
        if (existingAuthor) {
            return ('Author already exists');
        }

        const newAuthor = await Author.create(author);

        return res.status(200).json({
            message: 'Author created',
            newAuthor
        });

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


export const updateAuthor = async (authorId, author) => {
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

        return res.status(200).json({
            message: 'Author updated',
            updatedAuthor
        });
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const deleteAuthor = async (authorId) => {
    try {
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({
                message: 'Author not found',
            });
        }

        const deletedAuthor = await Author.findByIdAndDelete(authorId);

        return res.status(200).json({
            message: 'Author deleted',
            deletedAuthor
        });
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};