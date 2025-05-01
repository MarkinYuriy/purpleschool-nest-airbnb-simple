import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument /*Schema as MongooseSchema*/ } from 'mongoose';
import { ROOM_CLASS } from '../room.enums';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true, unique: true })
  num: number;
  @Prop({
    required: false,
    default: ROOM_CLASS.DEFAULT,
    nullable: false,
    enum: ROOM_CLASS,
  })
  class: ROOM_CLASS;
  @Prop({ required: false, default: false, nullable: false })
  balcony: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
