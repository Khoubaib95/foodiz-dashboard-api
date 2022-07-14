import { Router } from 'express';
import restaurantController from '../controller/restaurant.controller';
import { CreateRestaurantDto } from '../dto/restaurant.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ProductProviderRoute implements Routes {
  public path = '/restaurant';
  public router = Router();
  public controller = new restaurantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.controller.getAll);
    this.router.get(`${this.path}/id/:id`, this.controller.getById);
    this.router.get(`${this.path}/slug/:slug`, this.controller.getBySlug);
    this.router.get(`${this.path}/name/:name`, this.controller.getByName);

    this.router.post(`${this.path}`, validationMiddleware(CreateRestaurantDto, 'body', true), this.controller.create);

    this.router.put(`${this.path}/:id`, validationMiddleware(CreateRestaurantDto, 'body', true), this.controller.update);

    this.router.delete(`${this.path}/:id`, this.controller.delete);
  }
}

export default ProductProviderRoute;
