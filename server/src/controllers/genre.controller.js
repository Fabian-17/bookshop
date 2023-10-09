import { 
    getAllGenres,
    getGenre,
    createGenre,
    deleteGenre,
    updateGenre } from '../services/genre.services.js';


export const getGenres = async (_req, res) => {
    try {
        const genres = await getAllGenre();
        return res.status(200).json(genres);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


export const getGenresById = async (req, res) => {
    try {
        const genre = await getGenre(req.params.id);
        return res.status(200).json(genre);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const createdGenre = async (req, res) => {
    try {
        const genre = await createGenre(req.body);
        return res.status(201).json(genre);
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


export const updatedGenre = async (req, res) => {
    try {
        const genre = await updateGenre(req.params.id, req.body);
        return res.status(200).json(genre);
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


export const deletedGenre = async (req, res) => {
    try {
        const genre = await deleteGenre(req.params.id);
        return res.status(200).json(genre);
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};