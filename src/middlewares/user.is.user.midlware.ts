import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@/modules/auth/interface/auth.interface';

const userIsUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const givenUserId: string = req.params.id;
  const requestUserId: string = req.user._id;
  if (givenUserId == requestUserId) {
    next();
  } else {
    next(new HttpException(401, 'Unauthorized Action < user is not user >!'));
  }
};

export default userIsUser;
