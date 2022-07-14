import { model, Schema, Document } from 'mongoose';
import { IProduct } from '../interface/product.interface';
import { UserSchemaName, RestaurantSchemaName, ProductSchemaName, CategorySchemaName } from '@/const/schema.name';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: { type: String },
    slug: {
      type: String,
      required: true,
      index: true,
    },
    restaurant: { type: Schema.Types.ObjectId, ref: RestaurantSchemaName, required: true },
    creator: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true },
    category: { type: Schema.Types.ObjectId, ref: CategorySchemaName },
    image: String,
    price: {
      currentPrice: { type: Number, default: 0 },
      oldPrice: { type: Number, default: 0 },
    },
    numberOfSales: { type: Number, default: 0 },
    reviews: {
      total: { type: Number, default: 0 },
      list: [
        {
          commentBy: { type: Schema.Types.ObjectId, ref: UserSchemaName },
          date: { type: Number },
          content: { type: String },
        },
      ],
    },
    stars: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const productModel = model<IProduct & Document>(ProductSchemaName, productSchema);

export default productModel;
