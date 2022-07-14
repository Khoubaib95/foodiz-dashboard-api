import { Router } from 'express';
import AuthController from '../controller/auth.controller';
import { CreateUserDto } from '@/modules/user/dto/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body', true), this.authController.signUp);
    this.router.post(`${this.path}signin`, validationMiddleware(CreateUserDto, 'body', true), this.authController.logIn);
    this.router.get(
      `${this.path}validate-email/:userId/:code`,
      /* validationMiddleware(CreateUserDto, 'body', true),*/ this.authController.validateEmail,
    );
    this.router.get(
      `${this.path}forgot-password/:email`,
      /*, validationMiddleware(CreateUserDto, 'body', true),*/ this.authController.forgotPassword,
    );
    this.router.post(
      `${this.path}reset-password/:email/:token`,
      /*validationMiddleware(CreateUserDto, 'body', true),*/ this.authController.resetPassword,
    );

    this.router.post(`${this.path}logout`, this.authController.logOut);
  }
}

export default AuthRoute;
