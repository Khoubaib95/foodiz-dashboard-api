import { NextFunction, Request, Response } from 'express';
import { NAME, WEBSITE, CONTACT, VERSION } from '../../../config';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        version: VERSION,
        name: NAME,
        website: WEBSITE,
        contact: CONTACT,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
