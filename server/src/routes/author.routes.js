import { Router } from 'express';
import { getAuthors, 
    getAuthorById, 
    createdAuthor, 
    updatedAuthor, 
    deletedAuthor } from '../controllers/author.controller.js';

const AuthorRouter = Router();

AuthorRouter.get('/', getAuthors);

AuthorRouter.get('/:id', getAuthorById);

AuthorRouter.post('/', createdAuthor);

AuthorRouter.put('/:id', updatedAuthor);

AuthorRouter.delete('/:id', deletedAuthor);


export default AuthorRouter;