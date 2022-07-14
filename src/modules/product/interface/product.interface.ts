import { IUser } from '@/modules/user/interface/users.interface';
import { IRestaurant } from '@/modules/restaurant/interface/restaurant.interface';
import { TReviews, TInteraction } from '@/interfaces/public.inteface';

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  slug: string;
  restaurant: string | IRestaurant;
  creator: string | IUser;
  category: string;
  image: string;
  price: { currentPrice: number; oldPrice: number };
  numberOfSales: number;
  reviews: string[] | TReviews;
  stars: number;
  createdAt: string;
  updatedAt: string;
}
