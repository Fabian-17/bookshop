import {
    getAllAuthors, 
    getAuthor,
    createAuthor, 
    updateAuthor, 
    deleteAuthor } from '../services/author.services.js';

export const getAuthors = async (_req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json(authors);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getAuthorById = async (req, res) => {
    try {
        const author = await getAuthor(req.params.id);
        return res.status(200).json(author);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const createdAuthor = async (req, res) => {
    try {
        const author = await createAuthor(req.body);
        return res.status(201).json(author);
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const updatedAuthor = async (req, res) => {
    try {
        const author = await updateAuthor(req.params.id, req.body);
        return res.status(200).json(author);
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const deletedAuthor = async (req, res) => {
    try {
        const author = await deleteAuthor(req.params.id);
        return res.status(200).json(author);
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};