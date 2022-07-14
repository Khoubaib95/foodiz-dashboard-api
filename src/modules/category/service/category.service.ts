import { HttpException } from '@exceptions/HttpException';
import { ICategory } from '../interface/category.interface';
import { TDeleteOne, TUpdateOne } from '@/interfaces/public.inteface';
import categoryModel from '../model/category.model';
import restaurantModel from '@/modules/restaurant/model/restaurant.model';
import { isEmpty, createSlug } from '@utils/util';

class Service {
  public category = categoryModel;
  // public users = userModel;
  public restaurant = restaurantModel;
  public async getAll(attributes = ''): Promise<Partial<ICategory[]>> {
    const data: Partial<ICategory[]> = await this.category.find().populate('products.list', 'name price image').select(attributes);
    return data;
  }

  public async getById(_id: string, attributes = ''): Promise<Partial<ICategory>> {
    if (isEmpty(_id)) throw new HttpException(400, "You're not userId");
    const data: Partial<ICategory> = await await this.category.findOne({ _id }).select(attributes); //.populate('owner', 'fname lname email')
    //.populate('followers.users');
    if (!data) throw new HttpException(409, "You're not user");

    return data;
  }

  public async getBySlug(slug: string, attributes = ''): Promise<Partial<ICategory>> {
    if (isEmpty(slug)) throw new HttpException(400, "You're slug");
    const data: Partial<ICategory> = await await this.category.findOne({ slug }).select(attributes);
    if (!data) throw new HttpException(409, 'No Category with provided slug');
    return data;
  }

  public async getByName(name: string, attributes = ''): Promise<Partial<ICategory>> {
    if (isEmpty(name)) throw new HttpException(400, "You're name");
    const data: Partial<ICategory> = await await this.category.findOne({ name }).select(attributes);
    if (!data) throw new HttpException(409, 'No Category with provided name');
    return data;
  }

  public async getRestaurantId(restaurant: string, attributes = ''): Promise<Partial<ICategory[]>> {
    if (isEmpty(restaurant)) throw new HttpException(400, 'no id provided');
    const data: Partial<ICategory[]> = await await this.category.find({ restaurant }).select(attributes);
    if (!data) throw new HttpException(409, 'No Category with provided name');
    return data;
  }

  public async create(categoryData: Partial<ICategory>): Promise<Partial<ICategory>> {
    if (isEmpty(categoryData)) throw new HttpException(400, "You're not categoryData");
    categoryData.slug = createSlug(categoryData.name);
    if (!categoryData.image) {
      categoryData.image = `${process.env.SERVER_URL}/uploads/restaurant-avatar.jpeg`;
    }
    const data: Partial<ICategory> = await this.category.create(categoryData);

    /*const addToRestaurant: TUpdateOne =*/
    await this.restaurant.updateOne({ _id: categoryData.restaurant }, { $push: { 'categories.list': data._id }, $inc: { 'categories.total': 1 } });

    return data;
  }

  public async update(_id: string, data: Partial<ICategory>): Promise<TUpdateOne> {
    if (isEmpty(data)) throw new HttpException(400, "You're not data");
    const updated: TUpdateOne = await this.category.updateOne({ _id }, { ...data });
    if (updated.n === 0) throw new HttpException(404, "category doesn't exist or already deleted");
    if (updated.nModified === 0) throw new HttpException(500, 'some error happened');
    return updated;
  }

  public async delete(_id: string): Promise<TDeleteOne> {
    const deleted: TDeleteOne = await this.category.deleteOne({ _id });
    if (deleted.n === 0) throw new HttpException(404, "product doesn't exist or already deleted");
    if (deleted.deletedCount === 0) throw new HttpException(500, 'some error happened');
    return deleted;
  }
}

export default Service;

/*
  public async follow(userId: string, prodproId: string, action: string): Promise<any> {
    const data: any = await this.product.updateOne(
      { _id: prodproId },
      { [action === 'ADD' ? '$push' : '$pull']: { 'followers.users': userId }, $inc: { 'followers.total': action === 'ADD' ? 1 : -1 } },
    );
    return data;
  }

  public async like(userId: string, prodproId: string, action: string): Promise<any> {
    const data: any = await this.product.updateOne(
      { _id: prodproId },
      { [action === 'ADD' ? '$push' : '$pull']: { 'likes.users': userId }, $inc: { 'likes.total': action === 'ADD' ? 1 : -1 } },
    );
    return data;
  }

  public async dislike(userId: string, prodproId: string, action: string): Promise<any> {
    const data: any = await this.product.updateOne(
      { _id: prodproId },
      { [action === 'ADD' ? '$push' : '$pull']: { 'dislikes.users': userId }, $inc: { 'dislikes.total': action === 'ADD' ? 1 : -1 } },
    );
    return data;
  }
*/
