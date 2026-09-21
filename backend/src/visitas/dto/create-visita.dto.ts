import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateVisitaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apPaterno: string;

  @IsString()
  @IsNotEmpty()
  apMaterno: string;

  @IsString()
  @IsIn(['masculino', 'femenino'])
  genero: string;
}
