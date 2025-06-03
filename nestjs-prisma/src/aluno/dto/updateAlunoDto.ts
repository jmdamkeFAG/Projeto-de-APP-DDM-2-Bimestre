import { IsString, IsNotEmpty, IsEmail, IsDate, IsOptional, isString } from 'class-validator';

export class UpdateAlunoDTO {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsDate()
  @IsOptional()
  dataNasc: Date;

  @IsString()
  curso?: string;
}
