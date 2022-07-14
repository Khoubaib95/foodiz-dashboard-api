import { HttpException } from '@exceptions/HttpException';
import { IProduct } from '../interface/product.interface';
import { TDeleteOne, TUpdateOne } from '@/interfaces/public.inteface';
import productModel from '../model/product.model';
import restaurantModel from '@/modules/restaurant/model/restaurant.model';
import categoryModel from '@/modules/category/model/category.model';
import userModel from '@/modules/user/model/users.model';
import { isEmpty, createSlug } from '@utils/util';

class Service {
  public product = productModel;
  public restaurant = restaurantModel;
  public category = categoryModel;
  public users = userModel;

  public async getAll(attributes = ''): Promise<Partial<IProduct[]>> {
    const data: Partial<IProduct[]> = await this.product.find().select(attributes);
    return data;
  }

  public async getById(_id: string, attributes = ''): Promise<Partial<IProduct>> {
    if (isEmpty(_id)) throw new HttpException(400, "You're not userId");

    const data: Partial<IProduct> = await await this.product.findOne({ _id }).select(attributes); //.populate('owner', 'fname lname email')
    //.populate('followers.users');
    if (!data) throw new HttpException(409, "You're not user");

    return data;
  }

  public async getBySlug(slug: string, attributes = ''): Promise<Partial<IProduct>> {
    if (isEmpty(slug)) throw new HttpException(400, "You're slug");

    const data: Partial<IProduct> = await await this.product.findOne({ slug }).select(attributes);
    if (!data) throw new HttpException(409, 'No Product Provider');

    return data;
  }

  public async getByName(name: string, attributes = ''): Promise<Partial<IProduct>> {
    if (isEmpty(name)) throw new HttpException(400, "You're name");

    const data: Partial<IProduct> = await await this.product.findOne({ name }).select(attributes);
    if (!data) throw new HttpException(409, 'No Product with provided name');

    return data;
  }

  public async getRestaurantId(restaurant: string, attributes = ''): Promise<Partial<IProduct[]>> {
    if (isEmpty(restaurant)) throw new HttpException(400, "You're name");

    const data: Partial<IProduct[]> = await this.product.find({ restaurant }).populate('category', 'name').select(attributes);
    if (!data) throw new HttpException(409, 'No Product with provided name');

    return data;
  }

  public async create(productData: Partial<IProduct>): Promise<Partial<IProduct>> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");
    productData.slug = createSlug(productData.name);
    if (!productData.image) {
      productData.image = `${process.env.SERVER_URL}/uploads/restaurant-avatar.jpeg`;
    }
    const product = { ...productData, price: { currentPrice: productData.price } };
    const data: Partial<IProduct> = await this.product.create(product);

    /*const addToRestaurant: TUpdateOne =*/
    await this.restaurant.updateOne({ _id: productData.restaurant }, { $push: { 'products.list': data._id }, $inc: { 'products.total': 1 } });
    /*const addToCategory: TUpdateOne = */
    await this.category.updateOne({ _id: productData.category }, { $push: { 'products.list': data._id }, $inc: { 'products.total': 1 } });

    return data;
  }

  public async update(_id: string, data: Partial<IProduct>): Promise<TUpdateOne> {
    if (isEmpty(data)) throw new HttpException(400, "You're not data");
    const updated: TUpdateOne = await this.product.updateOne({ _id }, data);
    if (updated.n === 0) throw new HttpException(404, "product doesn't exist or already deleted");
    if (updated.nModified === 0) throw new HttpException(500, 'some error happened');
    return updated;
  }

  public async delete(_id: string): Promise<TDeleteOne> {
    const deleted: TDeleteOne = await this.product.deleteOne({ _id });
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
