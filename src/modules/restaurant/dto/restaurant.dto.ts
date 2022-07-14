import { IsString } from 'class-validator';

// Create Provider DTO
export class CreateRestaurantDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public image: any;

  @IsString()
  public cover: string;
}
