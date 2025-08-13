import { IsEmail, IsString, MinLength, IsInt, Min } from "class-validator";

export class RegisterUserDto {
  @IsEmail({}, { message: "Email inválido" })
  email!: string;

  @IsString()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password!: string;

  @IsString({ message: "El nombre es obligatorio" })
  name!: string;

  @IsString({ message: "La carrera es obligatoria" })
  career!: string;

  @IsInt({ message: "El semestre debe ser un número entero" })
  @Min(1, { message: "El semestre debe ser al menos 1" })
  semester!: number;
}
