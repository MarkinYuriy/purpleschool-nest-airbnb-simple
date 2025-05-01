import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Room } from '../../room/models/room.model';
import { BOOKING_STATUS } from '../booking.enums';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, type: Date })
  date: Date;
  @Prop({
    required: false,
    default: BOOKING_STATUS.ACTIVE,
    nullable: false,
    enum: BOOKING_STATUS,
  })
  status: BOOKING_STATUS;
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: Room.name,
  })
  room: MongooseSchema.Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
