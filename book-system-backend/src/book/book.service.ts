import { DbService } from 'src/db/db.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject()
  dbService: DbService;

  async list(name: string) {
    const books: Book[] = await this.dbService.read();
    return name
      ? books.filter((book) => {
          return book.name.includes(name);
        })
      : books;
  }

  async findById(id: number) {
    const books: Book[] = await this.dbService.read();
    return books.find((book) => book.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();

    const newBook: Book = {
      id: randomNum(),
      name: createBookDto.name,
      author: createBookDto.author,
      description: createBookDto.description,
      cover: createBookDto.cover,
    };
    books.push(newBook);
    await this.dbService.write(books);
    return newBook;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const bookIndex = books.findIndex((book) => book.id === updateBookDto.id);
    if (bookIndex === -1) {
      throw new Error('改图书不存在');
    }
    books[bookIndex] = {
      ...books[bookIndex],
      name: updateBookDto.name,
      author: updateBookDto.author,
      description: updateBookDto.description,
      cover: updateBookDto.cover,
    };
    await this.dbService.write(books);
    return books[bookIndex];
  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      await this.dbService.write(books);
      return { message: '删除成功' };
    }
  }
}
