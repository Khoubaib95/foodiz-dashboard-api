import { model, Schema, Document } from 'mongoose';
import { IUser } from '../interface/users.interface';
import { UserSchemaName, RestaurantSchemaName, ProductSchemaName } from '@/const/schema.name';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerification: { isVerified: { type: Boolean, default: false }, verifivationCode: String },
    password: {
      type: String,
      required: true,
    },
    fname: String,
    lname: String,
    image: { type: String, default: 'AVATAR' },
    restaurants: { total: { type: Number, default: 0 }, list: [{ type: Schema.Types.ObjectId, ref: RestaurantSchemaName }] },
    productAdded: { total: { type: Number, default: 0 }, list: [{ type: Schema.Types.ObjectId, ref: ProductSchemaName }] },
    roles: {
      admin: [{ userId: String, givenBy: String }],
      editor: [{ userId: String, givenBy: String }],
      moderator: [{ userId: String, givenBy: String }],
    },
  },
  { timestamps: true },
);

const userModel = model<IUser & Document>(UserSchemaName, userSchema);

export default userModel;
