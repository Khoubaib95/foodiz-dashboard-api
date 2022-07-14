import { IProduct } from '@/modules/product/interface/product.interface';
import { IRestaurant } from '@/modules/restaurant/interface/restaurant.interface';
import { TPPUsersRole } from '@/interfaces/public.inteface';

export interface IUser {
  _id: string;
  email: string;
  emailVerification: { isVerified: boolean; verifivationCode: string };
  password?: string;
  fname: string;
  lname: string;
  image: string;
  restaurant: { total: number; list: string[] | IRestaurant[] };
  productAdded: { total: number; list: string[] | IProduct[] };
  roles: TPPUsersRole;
  createdAt: string;
  updatedAt: string;
}
