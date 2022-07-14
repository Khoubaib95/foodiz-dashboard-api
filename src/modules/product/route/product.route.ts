import { Router } from 'express';
import productController from '../controller/product.controller';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ProductRoute implements Routes {
  public path = '/product';
  public router = Router();
  public controller = new productController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.controller.getAll);
    this.router.get(`${this.path}/id/:id`, this.controller.getById);
    this.router.get(`${this.path}/slug/:slug`, this.controller.getBySlug);
    this.router.get(`${this.path}/name/:name`, this.controller.getByName);
    this.router.get(`${this.path}/restaurant/:resid`, this.controller.getRestaurantId);
    this.router.post(`${this.path}`, validationMiddleware(CreateProductDto, 'body', true), this.controller.create);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateProductDto, 'body', true), this.controller.update);
    this.router.delete(`${this.path}/:id`, this.controller.delete);
  }
}

export default ProductRoute;
