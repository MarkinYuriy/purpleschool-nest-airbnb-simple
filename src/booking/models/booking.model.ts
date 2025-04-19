import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Room } from '../../room/models/room.model';
import { BookingStatus } from '../../Common/common.enums';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, unique: true, type: Date })
  date: Date;
  @Prop({ required: false, default: 0, nullable: false, enum: BookingStatus })
  status: BookingStatus;
  @Prop({
    required: false,
    type: MongooseSchema.Types.ObjectId,
    ref: Room.name,
  })
  room: Room;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
