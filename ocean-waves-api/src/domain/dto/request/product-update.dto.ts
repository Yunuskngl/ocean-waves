import { IsArray, IsOptional, IsString } from "class-validator";

export class ProductUpdateDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  image?: string[];

  @IsArray()
  @IsOptional()
  features?: string[];
}