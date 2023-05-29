const booksController = require('../controllers/booksController');
const Books = require('../models/booksModel');

// Mock the Books model and methods
jest.mock('../models/booksModel');

describe('booksController', () => {
  describe('createBook', () => {
    it('should create a new book and return it in the response', async () => {
      const req = {
        body: {
          name: 'Book Name',
          author: 'Book Author',
          price: 10,
        },
      };

      const newBook = {
        _id: 'bookId',
        name: 'Book Name',
        author: 'Book Author',
        price: 10,
      };

      // Mock the create method
      Books.create = jest.fn().mockResolvedValue(newBook);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await booksController.createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ book: newBook });
    });
  });

  describe('getBooks', () => {
    it('should return all books in the response', async () => {
      const books = [
        {
          _id: 'bookId1',
          name: 'Book 1',
          author: 'Author 1',
          price: 10,
        },
        {
          _id: 'bookId2',
          name: 'Book 2',
          author: 'Author 2',
          price: 20,
        },
      ];

      // Mock the find method
      Books.find = jest.fn().mockResolvedValue(books);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await booksController.getBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ books });
    });
  });

  // Rest of the tests for other controller methods...
});
