import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/modules/auth/interface/auth.interface';
import { TUpdateOne, TDeleteOne } from '@/interfaces/public.inteface';
import { CreateUserDto } from '../dto/users.dto';
import userService from '../service/users.service';

class UsersController {
  public userService = new userService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData = await this.userService.getAll();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const attributes: string = req.query.attributes as string;
      const findOneUserData = await this.userService.getById(userId, attributes);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getFromToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user._id;
      const attributes: string = req.query.attributes as string;
      const data = await this.userService.getFromToken(userId, attributes);
      res.status(200).json({ data, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user._id;
      const userData: CreateUserDto = req.body;
      const updateUserData: TUpdateOne = await this.userService.update(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'user updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user._id;
      const deleteUserData: TDeleteOne = await this.userService.delete(userId);
      res.status(200).json({ data: deleteUserData, message: 'user deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
