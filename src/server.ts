import App from '@/app';
import AuthRoute from '@/modules/auth/routes/auth.route';
import ProductRoute from '@/modules/product/route/product.route';
import RestaurantRoute from '@/modules/restaurant/route/restaurant.route';
import CategoryRoute from '@/modules/category/route/category.route';
import IndexRoute from '@/modules/index/route/index.route';
import UsersRoute from '@/modules/user/route/users.route';
import UploadRoute from '@/modules/upload/route/upload.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new UploadRoute(),
  new IndexRoute(),
  new AuthRoute(),
  new UsersRoute(),
  new ProductRoute(),
  new RestaurantRoute(),
  new CategoryRoute(),
]);

app.listen();
