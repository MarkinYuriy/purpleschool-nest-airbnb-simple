import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Booking, BookingDocument } from './models/booking.model';
import { CreateUpdateBookingDto } from './dto/createUpdateBookingDto';
import { RoomService } from '../room/room.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private roomService: RoomService,
  ) {}

  async getByRoomId(id: string) {
    return this.bookingModel.find({ room: id }).exec();
  }

  async getByDate(date: string) {
    const newDate = new Date(date);
    // newDate.setHours(0, 0, 0, 0);
    return this.bookingModel.find({ date: newDate }).exec();
  }

  async getByDateAndRoom(date: Date, roomId: string) {
    // date.setHours(0, 0, 0, 0);
    return this.bookingModel.find({ date: date, room: roomId }).exec();
  }

  async create(dto: CreateUpdateBookingDto) {
    const room = await this.roomService.getById(dto.room);
    const date = new Date(dto.date);
    // date.setHours(0, 0, 0, 0);

    if (!room) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }
    const isDateBooked = await this.getByDateAndRoom(date, dto.room);
    console.log(isDateBooked);
    if (isDateBooked.length > 0) {
      throw new HttpException('Date is booked', HttpStatus.BAD_REQUEST);
    }
    const newBooking: BookingDocument = await this.bookingModel.create({
      date: date,
      room: dto.room,
      status: dto.status,
    });
    return newBooking;
  }

  async update(id: string, dto: CreateUpdateBookingDto) {
    const date = new Date(dto.date);
    return this.bookingModel
      .findByIdAndUpdate(
        id,
        {
          date: date,
          room: dto.room,
          status: dto.status,
        },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<HydratedDocument<Booking>> | null {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }

  async deleteMany(roomId: string) {
    return this.bookingModel.deleteMany({ room: roomId }).exec();
  }
}
