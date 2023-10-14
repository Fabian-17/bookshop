import {
    getAllBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook } from '../services/books.services.js';
import path from 'path';


export const getBooks = async (_req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


export const getBookById = async (req, res) => {
    try {
        const book = await getBook(req.params.id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const createdBook = async (req, res) => {
  try {
    const { title, genre, year_publication, author } = req.body;
    const { front_page } = req.files;

    const imageName = `book_${Date.now()}${path.extname(front_page.name)}`;
    front_page.mv(`./src/files/${imageName}`);


    const book = {
      title,
      genre,
      year_publication,
      front_page: imageName,
      author,
    };

    const newBook = await createBook(book); 

    res.json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating book' });
  }
};


  export const updatedBook = async (req, res) => {
    const { id } = req.params; 
    const bookData = req.body; 
  
    try {
      const updatedBook = await updateBook(id, bookData);
  
      if (updatedBook.message === 'Book not found') {
        return res.status(404).json({
          message: 'Book not found',
        });
      }
  
      return res.status(200).json(updatedBook);
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  };
  


export const deletedBook = async (req, res) => {
    try {
        const book = await deleteBook(req.params.id);
        return res.status(200).json(book);
    }catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};