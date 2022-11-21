import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  @IsPositive()
  no: number;
}
