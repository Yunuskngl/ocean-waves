import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  image: string[];

  @IsArray()
  @IsNotEmpty()
  features: string[];
}