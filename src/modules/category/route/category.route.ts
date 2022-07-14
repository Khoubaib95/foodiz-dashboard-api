import { Router } from 'express';
import Controller from '../controller/category.controller';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class route implements Routes {
  public path = '/category';
  public router = Router();
  public controller = new Controller();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.controller.getAll);
    this.router.get(`${this.path}/id/:id`, this.controller.getById);
    this.router.get(`${this.path}/slug/:slug`, this.controller.getBySlug);
    this.router.get(`${this.path}/name/:name`, this.controller.getByName);
    this.router.get(`${this.path}/restaurant/:id`, this.controller.getRestaurantId);
    this.router.post(`${this.path}`, validationMiddleware(CreateCategoryDto, 'body'), this.controller.create);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateCategoryDto, 'body', true), this.controller.update);
    this.router.delete(`${this.path}/:id`, this.controller.delete);
  }
}

export default route;
