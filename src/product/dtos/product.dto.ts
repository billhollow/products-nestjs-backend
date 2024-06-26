import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, MinLength, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductDto {

  @IsString()
  handle: string;

  @IsString()
  @MinLength(2, { message: '"title" must have atleast 2 characters.' })
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @Transform(value => String(value)) // Convert any incoming value to string
  @IsString()
  sku: string;
  
  @IsNumber({maxDecimalPlaces: 2})
  grams: number;

  @Min(0)
  @IsInt()
  @IsOptional()
  stock?: number;

  @Min(0)
  @IsInt()
  price: number;

  @IsInt()
  @IsOptional()
  comparePrice?: number;

  @Transform(value => String(value)) // Convert any incoming value to string
  @IsString()
  barcode: string;
}


export class UpdateProductDto extends PartialType(CreateProductDto) {}