import { Router } from 'express';
import UploadController from '../controller/upload.controller';
import { Routes } from '@interfaces/routes.interface';
import Upload from '@/middlewares/upload.middleware';

class UsersRoute implements Routes {
  public path = '/upload-image';
  public router = Router();
  public controller = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, Upload.single('image'), this.controller.upload);
    //this.router.post(`${"uploads"}`, Upload.single('image'), this.controller.upload);
  }
}

export default UsersRoute;
