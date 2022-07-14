import { Request } from 'express';
import multer from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callBack: DestinationCallback) => {
    callBack(null, 'src/uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, callBack: FileNameCallback) => {
    const filename = `${Date.now()}-${file.originalname}.${file.mimetype.split('/')[1]}`;
    req.url = `${process.env.SERVER_URL}/uploads/${filename}`;
    callBack(null, filename);
  },
});

const Upload = multer({ storage });

export default Upload;
