import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, /*Schema as MongooseSchema*/ } from 'mongoose';
import { RoomClass } from '../../Common/common.enums';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  // @Prop({
  //   type: MongooseSchema.Types.ObjectId,
  //   autoIncrement: true,
  //   required: false,
  // })
  // _id: string;
  @Prop({ required: true, unique: true })
  num: number;
  @Prop({ required: false, default: 1, nullable: false })
  class: RoomClass;
  @Prop({ required: false, default: false, nullable: false })
  balcony: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
