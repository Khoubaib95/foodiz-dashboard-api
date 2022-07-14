import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@/modules/auth/interface/auth.interface';

const userIsUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  console.log('req.body : ', req.user);
  const givenUserId: string = req.params.id;
  const requestUserId: string = req.user._id;
  console.log('givenUserId :', givenUserId);
  console.log('givenUserId type :', typeof givenUserId);
  console.log('requestUserId :', requestUserId);
  console.log('requestUserId type:', typeof requestUserId);
  console.log('result :', givenUserId == requestUserId);

  if (givenUserId == requestUserId) {
    next();
  } else {
    next(new HttpException(401, 'Unauthorized Action < user is not user >!'));
  }
};

export default userIsUser;
