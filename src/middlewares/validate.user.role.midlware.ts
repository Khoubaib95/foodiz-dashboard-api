import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@/modules/auth/interface/auth.interface';
import userModel from '@/modules/user/model/users.model';

const validateUserRole = (roles: string[]) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const userId: string = req.params.userId; // .../:userId
  const serviceOwnerId: string = req.params.serviceOwnerId; // .../:serviceOwnerId
  const ownerRoles = await userModel.findById(serviceOwnerId, { administrator: 1 });
  const permittedUser = [];

  for (const role in roles) {
    permittedUser.push(...ownerRoles[roles[role]]);
    // console.log(role)
  }
  if (permittedUser.findIndex(role => role.userId === userId) > 0) {
    next();
  } else {
    next(new HttpException(401, 'Unauthorized request !'));
  }
};

export default validateUserRole;
