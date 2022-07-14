import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { uuid } from 'uuidv4';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '../../user/dto/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interface/auth.interface';
import { IUser } from '../../user/interface/users.interface';
import userModel from '../../user/model/users.model';
import { isEmpty } from '@utils/util';
import { CLIENT_URL } from '@config';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<boolean> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: IUser = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const emailVerification = { verifivationCode: uuid() };
    if (!userData.image) {
      userData.image = `${process.env.SERVER_URL}/uploads/user-avatar.jpeg`;
    }
    await this.users.create({ ...userData, password: hashedPassword, emailVerification });
    return true;
  }

  public async login(userData: CreateUserDto, attributes = ''): Promise<{ data: Partial<IUser & { access_token: TokenData }> }> {
    if (isEmpty(userData)) throw new HttpException(400, 'No email or password');

    const findUser: IUser = await this.users
      .findOne({ email: userData.email })
      .populate('restaurants.list', 'name ')
      .select(`${attributes} password`)
      .lean();
    if (!findUser) throw new HttpException(404, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken({ _id: findUser._id, email: findUser.email });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = findUser;
    return { data: { ...data, access_token: tokenData } };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: IUser = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  public async validateEmail(userId: string, code: string): Promise<boolean> {
    if (isEmpty(userId)) throw new HttpException(400, 'no id provided');
    if (isEmpty(code)) throw new HttpException(400, 'no code provided');

    const findUser: Partial<IUser> = await this.users.findById(userId).select('emailVerification');
    if (!findUser) throw new HttpException(400, `no user with the provided id`);
    if (findUser.emailVerification.verifivationCode === code) {
      await this.users.updateOne(
        { _id: userId },
        { emailVerification: { isVerified: true, verifivationCode: findUser.emailVerification.verifivationCode } },
      );
      return true;
    }
    return false;
  }

  public async forgotPassword(email: string): Promise<string> {
    if (isEmpty(email)) throw new HttpException(400, 'no email');

    const findUser: Partial<IUser> = await this.users.findOne({ email }).select('password');
    if (!findUser) throw new HttpException(409, `no user with the provided email`);
    const dataStoredInToken = { _id: findUser._id };
    const secretKey: string = findUser.password;
    const expiresIn: number = 60 * 30;
    const link = `${CLIENT_URL}/reset-password/${'token'}`;
    return link;
  }

  public async resetPassword(token: string, email: string, password: string): Promise<any> {
    if (isEmpty(email)) throw new HttpException(400, 'no email');
    if (isEmpty(token)) throw new HttpException(400, 'no token');
    if (isEmpty(password)) throw new HttpException(400, 'no password');

    const findUser: Partial<IUser> = await this.users.findOne({ email }).select('password');
    if (!findUser) throw new HttpException(409, `no user with the provided email`);

    const secretKey: string = findUser.password;
    const verificationResponse = (await verify(token, secretKey)) as { _id: string };
    const userId = verificationResponse._id;
    const hashedPassword = await hash(password, 10);
    const updatedUser = await this.users.updateOne({ _id: userId }, { password: hashedPassword });
    return updatedUser;
  }

  public createToken(user: { _id: string; email: string }): TokenData {
    const dataStoredInToken: DataStoredInToken = user;
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
