import { IsString, IsArray } from 'class-validator';

// Create Category DTO
export class CreateCategoryDto {
  @IsString()
  public name: string;

  @IsString()
  public restaurant: string;

  @IsString()
  public description: string;

  @IsString()
  public image: string;
}

// update Category DTO
export class UpdateCategoryDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public slug: string;

  @IsString()
  public restaurant: string;

  @IsArray()
  public product: string[];

  @IsString()
  public creator: string;

  @IsString()
  public image: string;
}
