import { IUser } from '@/modules/user/interface/users.interface';
import { IRestaurant } from '@/modules/restaurant/interface/restaurant.interface';
import { IProduct } from '@/modules/product/interface/product.interface';

export interface ICategory {
  _id?: string;
  name: string;
  description: string;
  slug: string;
  restaurant: string | IRestaurant;
  products: string[] | IProduct[];
  creator: string | IUser;
  image: string;
  createdAt: string;
  updatedAt: string;
}
