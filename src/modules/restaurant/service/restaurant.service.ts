import { HttpException } from '@exceptions/HttpException';
import { IRestaurant } from '../interface/restaurant.interface';
import { TUpdateOne, TDeleteOne } from '@/interfaces/public.inteface';
import restaurantModel from '../model/restaurant.model';
import userModel from '@/modules/user/model/users.model';
import { isEmpty } from '@utils/util';
import { createSlug } from '@/utils/util';

class Service {
  public restaurant = restaurantModel;
  public users = userModel;

  public async getAll(attributes = ''): Promise<Partial<IRestaurant[]>> {
    const data = await this.restaurant.find().select(attributes);
    return data;
  }

  public async getById(_id: string, attributes = ''): Promise<IRestaurant> {
    if (isEmpty(_id)) throw new HttpException(400, "You're not userId");

    const data: IRestaurant = await this.restaurant.findOne({ _id }).select(attributes);
    if (!data) throw new HttpException(409, 'No Restaurent Provider');
    return data;
  }

  public async getBySlug(slug: string, attributes = ''): Promise<Partial<IRestaurant>> {
    if (isEmpty(slug)) throw new HttpException(400, "You're slug");

    const data: Partial<IRestaurant> = await await this.restaurant.findOne({ slug }).select(attributes);
    if (!data) throw new HttpException(409, 'No Restaurent Provider');

    return data;
  }

  public async getByName(name: string, attributes = ''): Promise<Partial<IRestaurant>> {
    if (isEmpty(name)) throw new HttpException(400, "You're name");

    const data: Partial<IRestaurant> = await await this.restaurant.findOne({ name }).select(attributes);
    if (!data) throw new HttpException(409, 'No Category with provided name');

    return data;
  }

  public async create(restaurantData: Partial<IRestaurant>): Promise<IRestaurant> {
    if (isEmpty(restaurantData)) throw new HttpException(400, "You're not restaurantData");
    restaurantData.slug = createSlug(restaurantData.name);
    if (!restaurantData.cover) {
      restaurantData.cover = `${process.env.SERVER_URL}/uploads/cover-avatar.jpeg`;
    }
    if (!restaurantData.image) {
      restaurantData.image = `${process.env.SERVER_URL}/uploads/restaurant-avatar.jpeg`;
    }
    const data = await this.restaurant.create(restaurantData);

    await this.users.updateOne({ _id: restaurantData.owner }, { $push: { 'restaurants.list': data._id }, $inc: { 'restaurants.total': 1 } });

    return data;
  }

  public async update(_id: string, data: Partial<IRestaurant>): Promise<TUpdateOne> {
    if (isEmpty(data)) throw new HttpException(400, "You're not data");
    const updated: TUpdateOne = await this.restaurant.updateOne({ _id }, { ...data });
    if (updated.n === 0) throw new HttpException(404, "restaurant doesn't exist or already deleted");
    if (updated.nModified === 0) throw new HttpException(500, 'some error happened');
    return updated;
  }

  public async delete(_id: string): Promise<TDeleteOne> {
    const deleted: TDeleteOne = await this.restaurant.deleteOne({ _id });
    if (deleted.n === 0) throw new HttpException(404, "restaurant doesn't exist or already deleted");
    if (deleted.deletedCount === 0) throw new HttpException(500, 'some error happened');
    return deleted;
  }
}

export default Service;
