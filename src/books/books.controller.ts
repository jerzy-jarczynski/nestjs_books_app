import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoriteBookDTO } from './dtos/favorite-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  getAll(): any {
    return this.booksService.getAll();
  }

  @Get('/:id')
  async getyId(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getById(id))) {
      throw new NotFoundException('Book not found');
    }
    return this.booksService.getById(id);
  }

  @Delete('/:id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getById(id))) {
      throw new NotFoundException('Book not found');
    }
    await this.booksService.delete(id);
    return { success: true };
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  create(@Body() bookData: CreateBookDTO) {
    return this.booksService.create(bookData);
  }

  @Post('/like')
  @UseGuards(JwtAuthGuard)
  async addLike(@Body() likeData: FavoriteBookDTO) {
    await this.booksService.addToFavorite(likeData);
    return { success: true };
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async edit(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() bookData: UpdateBookDTO,
  ) {
    if (!(await this.booksService.getById(id))) {
      throw new NotFoundException('Book not found');
    }
    await this.booksService.edit(id, bookData);
    return { success: true };
  }
}
