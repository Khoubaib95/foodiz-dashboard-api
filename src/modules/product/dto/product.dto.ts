import { IsString, IsNumber } from 'class-validator';

// Create Product DTO
export class CreateProductDto {
  @IsString()
  public name: string;

  @IsString()
  public restaurant: string;

  @IsString()
  public category: string;

  @IsString()
  public description: string;

  @IsString()
  public image: string;

  @IsNumber()
  public price: number;
}

// Update Product DTO
export class UpdateProductDto {}
