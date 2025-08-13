import { IsEmail, IsString, MinLength, IsInt, Min } from "class-validator";

export class UserLogInDto {
  @IsEmail({}, { message: "Email inválido" })
  email!: string;

  @IsString()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  password!: string;

}
