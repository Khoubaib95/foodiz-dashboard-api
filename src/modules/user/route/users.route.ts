import { Router } from 'express';
import UsersController from '../controller/users.controller';
import { CreateUserDto } from '../dto/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/user';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getAll);
    this.router.get(`${this.path}/get_user_from_token`, this.usersController.getFromToken);
    this.router.get(`${this.path}/:id`, this.usersController.getById);
    this.router.put(`${this.path}/`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.update);
    this.router.delete(`${this.path}/`, this.usersController.delete);
  }
}

export default UsersRoute;
