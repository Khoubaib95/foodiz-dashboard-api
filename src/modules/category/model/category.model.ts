import { model, Schema, Document } from 'mongoose';
import { ICategory } from '../interface/category.interface';
import { UserSchemaName, RestaurantSchemaName, ProductSchemaName, CategorySchemaName } from '@/const/schema.name';

const categorySchema = new Schema<ICategory>(
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
    products: { total: { type: Number, default: 0 }, list: [{ type: Schema.Types.ObjectId, ref: ProductSchemaName }] },
    creator: { type: Schema.Types.ObjectId, ref: UserSchemaName, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

const categoryModel = model<ICategory & Document>(CategorySchemaName, categorySchema);

export default categoryModel;
