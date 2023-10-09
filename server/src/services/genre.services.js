import { Genre } from '../models/genre.js';

export const getAllGenres = async () => {
    try {
        const genres = await Genre.find();
        if (genres.length === 0) {
            return ({
                message: 'Genres not found',
            });
        }
        return genres;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getGenre = async (genreId) => {
    try {
        const genre = await Genre.findById(genreId);
        if (!genre) {
            return ({
                message: 'Genre not found',
            });
        }
        return genre;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const createGenre = async (genre) => {
    try {
        const existingGenre = await Genre.findOne({ name: genre.name });
        if (existingGenre) {
            return ('Genre already exists');
        }
        const newGenre = await Genre.create(genre);
        return newGenre;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const updateGenre = async (genreId, genre) => {
    try {
        const existingGenre = await Genre.findById(genreId);
        if (!existingGenre) {
            return ({
                message: 'Genre not found',
            });
        }
        const updatedGenre = await Genre.findByIdAndUpdate(genreId, genre);
        if (!updatedGenre) {
            return ({
                message: 'Genre not found',
            });
        }
        return ({
            message: 'Genre updated',
            updatedGenre,
        });
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const deleteGenre = async (genreId) => {
    try {
        const genre = await Genre.findById(genreId);
        if (!genre) {
            return ({
                message: 'Genre not found',
            });
        }
        const deletedGenre = await Genre.findByIdAndDelete(genreId);
        return deletedGenre;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const grouped_genres = async (_req, res) => {
    try {
        const resultado = await Genre.aggregate([
          {
            $group: {
              _id: '$name', 
              total: { $sum: 1 }, 
            },
          },
        ]);
        return res.status(200).json(resultado);
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};