import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FavoriteBookDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  bookId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
