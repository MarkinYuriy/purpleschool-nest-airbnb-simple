import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './models/booking.model';
import { RoomService } from '../room/room.service';
import { Room, RoomSchema } from '../room/models/room.model';

@Module({
  providers: [BookingService, RoomService],
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [BookingController],
})
export class BookingModule {}
