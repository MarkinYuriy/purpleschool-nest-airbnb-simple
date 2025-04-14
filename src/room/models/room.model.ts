import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

export enum RoomClass {
  default = 1,
  advanced = 2,
  super = 3,
}

@Schema()
export class Room {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: string;
  @Prop({ required: true, unique: true })
  num: number;
  @Prop({ required: false, default: 1, nullable: false })
  class: RoomClass;
  @Prop({ required: false, default: false, nullable: false })
  balcony: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
