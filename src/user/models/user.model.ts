import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop([String])
  images: string[];
  // @Prop(Date)
  // createdAt: Date = new Date();
}

export const UserSchema = SchemaFactory.createForClass(User);
