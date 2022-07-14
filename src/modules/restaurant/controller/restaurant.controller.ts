import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/modules/auth/interface/auth.interface';
import { IRestaurant } from '../interface/restaurant.interface';
import { TUpdateOne, TDeleteOne } from '@/interfaces/public.inteface';
import restaurantService from '../service/restaurant.service';

class restaurantController {
  public service = new restaurantService();

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
      const productProviderId: string = req.params.id;
      const attributes: string = req.query.attributes as string;
      const data: IRestaurant = await this.service.getById(productProviderId, attributes);

      res.status(200).json({ data, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productProviderSlug: string = req.params.slug;
      const attributes: string = req.query.attributes as string;
      const data = await this.service.getBySlug(productProviderSlug, attributes);

      res.status(200).json({ data, message: 'findOne' });
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

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      req.body.owner = req.user._id;
      const restaurant: Partial<IRestaurant> = req.body;
      const data: any = await this.service.create(restaurant);

      res.status(201).json({ data, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id: string = req.params.id;
      const data: Partial<IRestaurant> = req.body;
      const updateData: TUpdateOne = await this.service.update(_id, data);

      res.status(200).json({ data: updateData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id: string = req.params.id;
      const data: TDeleteOne = await this.service.delete(_id);

      res.status(200).json({ data, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default restaurantController;
