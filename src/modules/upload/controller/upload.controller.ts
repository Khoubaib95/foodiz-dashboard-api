import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

class UploadController {
  public upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      console.log(file);
      if (!file) throw new HttpException(400, 'No File');
      res.status(201).json({ data: { url: req.url }, message: 'upload image' });
    } catch (error) {
      next(error);
    }
  };
}

export default UploadController;
