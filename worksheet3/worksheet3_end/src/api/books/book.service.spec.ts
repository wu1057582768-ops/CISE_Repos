import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './create-book.dto';

// 模拟 Mongoose 的 Model
const mockBookModel = {
  find: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  findById: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
  findByIdAndDelete: jest.fn().mockReturnThis(),
  create: jest.fn(),
};

const createTestBookDto = (): CreateBookDto => ({
  title: 'Test Book',
  isbn: '1234567890',
  author: 'Test Author',
  description: 'Test Description',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  published_date: new Date() as any, // 类型断言解决兼容性问题
  publisher: 'Test Publisher',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  updated_date: new Date() as any, // 同上
});

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test() should return "book route testing"', () => {
    expect(service.test()).toBe('book route testing');
  });

  it('findAll() should return an array of books', async () => {
    const book1 = createTestBookDto();
    const book2 = { ...createTestBookDto(), title: 'Test Book 2' };
    const mockBooks = [
      { _id: '1', ...book1 },
      { _id: '2', ...book2 },
    ];
    mockBookModel.exec.mockResolvedValueOnce(mockBooks);

    const result = await service.findAll();
    expect(result).toEqual(mockBooks);
  });

  it('findOne() should return a book if found', async () => {
    const mockBook = { _id: '1', ...createTestBookDto() };
    mockBookModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    });

    const result = await service.findOne('1');
    expect(result).toEqual(mockBook);
  });

  it('findOne() should throw NotFoundException if not found', async () => {
    mockBookModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    });

    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('create() should create a new book', async () => {
    const bookDto = createTestBookDto();
    const createdBook = { _id: '1', ...bookDto };
    mockBookModel.create.mockResolvedValueOnce(createdBook);

    const result = await service.create(bookDto);
    expect(result).toEqual(createdBook);
    expect(mockBookModel.create).toHaveBeenCalledWith(bookDto);
  });

  it('update() should update a book if found', async () => {
    const bookDto = createTestBookDto();
    const updatedBookDto = { ...bookDto, title: 'Updated Book' };
    const updatedBook = { _id: '1', ...updatedBookDto };

    mockBookModel.findByIdAndUpdate.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(updatedBook),
    });

    const result = await service.update('1', updatedBookDto);
    expect(result).toEqual(updatedBook);
  });

  it('update() should throw NotFoundException if book not found', async () => {
    const bookDto = createTestBookDto();
    const updatedBookDto = { ...bookDto, title: 'Updated Book' };

    mockBookModel.findByIdAndUpdate.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    });

    await expect(service.update('1', updatedBookDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('delete() should delete a book if found', async () => {
    const mockBook = { _id: '1', ...createTestBookDto() };
    mockBookModel.findByIdAndDelete.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    });

    const result = await service.delete('1');
    expect(result).toEqual(mockBook);
  });

  it('delete() should throw NotFoundException if book not found', async () => {
    mockBookModel.findByIdAndDelete.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    });

    await expect(service.delete('1')).rejects.toThrow(NotFoundException);
  });
});
