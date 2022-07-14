import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@/modules/auth/interface/auth.interface';
import userModel from '@/modules/user/model/users.model';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    const attributes: string = req.query.attributes as string;
    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId).populate('restaurants.list', 'name ').select(attributes);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
