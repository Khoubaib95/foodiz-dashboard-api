import { LOCAL_DB } from '@config';

export const dbConnection = {
  url: LOCAL_DB,
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};
