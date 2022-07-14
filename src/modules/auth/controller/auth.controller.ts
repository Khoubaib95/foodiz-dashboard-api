import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@/modules/user/dto/users.dto';
import { RequestWithUser } from '@/modules/auth/interface/auth.interface';
import { IUser } from '@/modules/user/interface/users.interface';
import AuthService from '../service/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const attributes: string = req.query.attributes as string;
      const { data } = await this.authService.login(userData, attributes);
      res.status(200).json({ data, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.user;
      const logOutUserData: IUser = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.userId;
      const code: string = req.params.code;
      const data = await this.authService.validateEmail(userId, code);
      res.status(200).json({ data, message: 'email validation' });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email: string = req.params.email;
      const data = await this.authService.forgotPassword(email);

      res.status(200).json({ data, message: 'forgot password' });
    } catch (error) {
      next(error);
    }
  };
  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const token = req.params.token;
      const password: string = req.body.password;
      const data = await this.authService.resetPassword(token, email, password);
      res.status(200).json({ data, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
