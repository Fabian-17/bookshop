import {
    getAllBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook } from '../services/books.services.js';

import fileDirName from '../utils/fileName.js';
const { __dirname } = fileDirName(import.meta);

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
    const { image } = req.files; 
  
    if (!image) {
      return res.status(400).json({ error: 'image is required' });
    }
  
    const original_filename = image.name.split(".")[0];
    const format = image.name.split(".")[1];
    const file_name = uuidv4() + "." + format;
  
    try {
      const book = await createBook(req.body, { image: { original_filename, format, file_name } });
  
      const { __dirname } = fileDirName(import.meta);
      const uploadPath = join(__dirname, "../files/", file_name);
  
      image.mv(uploadPath, function (err) {
        if (err) throw new Error(err);
      });
  
      return res.status(201).json(book);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };


  export const updatedBook = async (req, res) => {
    try {
      const bookId = req.params.id;
      const { image } = req.files; 
  
      const existingBook = await Book.findById(bookId);
  
      if (!existingBook) {
        return res.status(404).json({ error: 'book not found' });
      }
  
      if (req.body.title) {
        existingBook.title = req.body.title;
      }
      
      if (req.body.author) {
        existingBook.author = req.body.author;
      }
  
      if (image) {
        const original_filename = image.name.split(".")[0];
        const format = image.name.split(".")[1];
        const file_name = uuidv4() + "." + format;
  
        const { __dirname } = fileDirName(import.meta);
        const uploadPath = join(__dirname, "../files/", file_name);
  
        image.mv(uploadPath, async function (err) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error uploading image' });
          }
  
          existingBook.image.original_filename = original_filename;
          existingBook.image.format = format;
          existingBook.image.file_name = file_name;
  
          const updatedBook = await updateBook(bookId, existingBook);
  
          return res.status(200).json(updatedBook);
        });
      } else {
        const updatedBook = await updateBook(bookId, req.body);
  
        return res.status(200).json(updatedBook);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
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