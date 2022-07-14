import { hash } from 'bcrypt';
import { CreateUserDto } from '../dto/users.dto';
import { TUpdateOne, TDeleteOne } from '@/interfaces/public.inteface';
import { HttpException } from '@exceptions/HttpException';
import { IUser } from '../interface/users.interface';
import userModel from '../model/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async getFromToken(_id: string, attributes = ''): Promise<Partial<IUser>> {
    if (isEmpty(_id)) throw new HttpException(400, "You're not userId");

    const findUser: Partial<IUser> = await this.users.findById({ _id }).populate('restaurants.list', 'name image').select(attributes);

    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async getAll(): Promise<Partial<IUser>[]> {
    const users: Partial<IUser>[] = await this.users.find();
    return users;
  }

  public async getById(_id: string, attributes = ''): Promise<Partial<IUser>> {
    if (isEmpty(_id)) throw new HttpException(400, "You're not userId");

    const findUser: Partial<IUser> = await this.users.findOne({ _id }).populate('restaurants.list', 'name ').select(attributes);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async update(_id: string, userData: CreateUserDto): Promise<TUpdateOne> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: IUser = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != _id) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updated: TUpdateOne = await this.users.updateOne({ _id }, userData);
    if (updated.n === 0) throw new HttpException(404, "user doesn't exist or already deleted");
    if (updated.nModified === 0) throw new HttpException(500, 'some error happened');
    return updated;
  }

  public async delete(_id: string): Promise<TDeleteOne> {
    const deleted: TDeleteOne = await this.users.deleteOne({ _id });
    if (deleted.n === 0) throw new HttpException(404, "user doesn't exist or already deleted");
    if (deleted.deletedCount === 0) throw new HttpException(500, 'some error happened');
    return deleted;
  }
}

export default UserService;
