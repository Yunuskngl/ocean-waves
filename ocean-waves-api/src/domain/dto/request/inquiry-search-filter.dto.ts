import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class InquirySearchFilterDto {
  @IsString()
  @IsOptional()
  fullName: string;
  @IsString()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  limit: number
}
