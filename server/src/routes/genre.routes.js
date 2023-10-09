import { Router } from 'express';
import { getGenres, 
    getGenresById, 
    createdGenre, 
    updatedGenre, 
    deletedGenre } from '../controllers/genre.controller.js';

const GenreRouter = Router();

GenreRouter.get('/', getGenres);

GenreRouter.get('/:id', getGenresById);

GenreRouter.post('/', createdGenre);

GenreRouter.put('/:id', updatedGenre);

GenreRouter.delete('/:id', deletedGenre);

export default GenreRouter;