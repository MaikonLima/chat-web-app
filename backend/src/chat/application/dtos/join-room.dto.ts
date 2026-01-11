import { IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator';

export class JoinRoomDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  displayName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'room deve conter apenas letras, números, "_" ou "-".',
  })
  room!: string;
}
