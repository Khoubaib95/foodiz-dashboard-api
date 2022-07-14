import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/modules/auth/interface/auth.interface';
import { IProduct } from '../interface/product.interface';
import productService from '../services/product.service';

class ProductController {
  public service = new productService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attributes: string = req.query.attributes as string;
      const data = await this.service.getAll(attributes);
      res.status(200).json({ data, message: 'find' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const attributes: string = req.query.attributes as string;
      const data = await this.service.getById(productId, attributes);

      res.status(200).json({ data: data, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const slug: string = req.params.slug;

      const attributes: string = req.query.attributes as string;
      const data = await this.service.getBySlug(slug, attributes);

      res.status(200).json({ data: data, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
  public getByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name: string = req.params.name;
      const attributes: string = req.query.attributes as string;
      const data = await this.service.getByName(name, attributes);

      res.status(200).json({ data: data, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
  public getRestaurantId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resId: string = req.params.resid;
      const attributes: string = req.query.attributes as string;
      const data = await this.service.getRestaurantId(resId, attributes);

      res.status(200).json({ data: data, message: 'find' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      req.body.creator = req.user._id;
      const serviceData: Partial<IProduct> = req.body;
      const data: any = await this.service.create(serviceData);

      res.status(201).json({ data, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: Partial<IProduct> = req.body;
      const updateUserData = await this.service.update(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id: string = req.params.id;
      const data = await this.service.delete(_id);

      res.status(200).json({ data, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
