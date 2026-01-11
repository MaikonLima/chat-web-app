import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  room!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  content!: string;
}