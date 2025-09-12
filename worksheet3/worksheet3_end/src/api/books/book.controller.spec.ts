import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
  let bookController: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            test: jest.fn().mockReturnValue('test ok'),
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: '1', title: 'Test Book' }]),
            findOne: jest
              .fn()
              .mockResolvedValue({ id: '1', title: 'Test Book' }),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest
              .fn()
              .mockResolvedValue({ message: 'Book deleted successfully' }),
          },
        },
      ],
    }).compile();

    bookController = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });

  it('test() should return test ok', () => {
    expect(bookController.test()).toBe('test ok');
  });

  it('findAll() should return array of books', async () => {
    const result = await bookController.findAll();
    expect(result).toEqual([{ id: '1', title: 'Test Book' }]);
  });

  it('findOne() should return a book', async () => {
    const result = await bookController.findOne('1');
    expect(result).toEqual({ id: '1', title: 'Test Book' });
  });
});
