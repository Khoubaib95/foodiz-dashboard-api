import { model, Schema, Document } from 'mongoose';
import { IRestaurant } from '../interface/restaurant.interface';
import { UserSchemaName, RestaurantSchemaName, ProductSchemaName, CategorySchemaName } from '@/const/schema.name';

const restaurantSchema: Schema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true },
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: { type: String },
    categories: { total: { type: Number, default: 0 }, list: [{ type: Schema.Types.ObjectId, ref: CategorySchemaName }] },
    slug: {
      type: String,
      required: true,
      index: true,
    },
    image: String,
    cover: String,
    products: { total: { type: Number, default: 0 }, list: [{ type: Schema.Types.ObjectId, ref: ProductSchemaName }] },
    reviews: {
      total: { type: Number, default: 0 },
      list: [
        {
          by: { type: Schema.Types.ObjectId, ref: UserSchemaName },
          date: { type: Number },
          stars: { type: Number, default: 0 },
          content: String,
        },
      ],
    },
    stars: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const restaurantModel = model<IRestaurant & Document>(RestaurantSchemaName, restaurantSchema);

export default restaurantModel;
