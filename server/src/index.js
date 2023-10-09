import express from 'express';
import morgan from 'morgan';
import { environment } from './config/environments.js';
import { connectDB } from './config/connection.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());


const port = environment.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
})