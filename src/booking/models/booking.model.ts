import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Room } from '../../room/models/room.model';
import { BookingStatus } from '../../Common/common.enums';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  // @Prop({ type: MongooseSchema.Types.ObjectId })
  // _id: string;
  @Prop({ required: true, unique: true })
  date: Date;
  @Prop({ required: false, default: 0, nullable: false })
  status: BookingStatus;
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: Room.name })
  room: Room;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
