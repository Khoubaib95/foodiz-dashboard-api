import { IUser } from '@/modules/user/interface/users.interface';
import { IProduct } from '@/modules/product/interface/product.interface';
import { ICategory } from '@/modules/category/interface/category.interface';
import { TReviews } from '@/interfaces/public.inteface';

export interface IRestaurant {
  _id?: string;
  owner: string | IUser;
  name: string;
  description: string;
  categories: { total: number; list: string[] | ICategory[] };
  slug: string;
  image: string;
  cover: string;
  products: { total: number; list: string[] | IProduct[] };
  reviews: string[] | TReviews;
  stars: number;
  createdAt: string;
  updatedAt: string;
}
