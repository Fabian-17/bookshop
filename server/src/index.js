import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import path from "path";
import { environment } from './config/environments.js';
import { connectDB } from './config/connection.js';

import fileDirName from "./utils/fileDirName.js";
const { __dirname } = fileDirName(import.meta);

import AuthorRouter from './routes/author.routes.js';
import GenreRouter from './routes/genre.routes.js';
import BookRouter from './routes/book.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "../files")));

app.use("/authors", AuthorRouter);
app.use("/genres", GenreRouter);
app.use("/books", BookRouter);


const port = environment.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
})