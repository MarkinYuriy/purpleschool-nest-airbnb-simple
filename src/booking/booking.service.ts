import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Booking, BookingDocument } from './models/booking.model';
import { CreateUpdateBookingDto } from './dto/createUpdateBookingDto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async getByRoomId(id: string) {
    return this.bookingModel.find({ room: id }).exec();
  }

  async getByDate(date: string) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return this.bookingModel.find({ date: newDate }).exec();
  }

  async create(
    dto: CreateUpdateBookingDto,
  ): Promise<HydratedDocument<Booking>> {
    const newDto = new CreateUpdateBookingDto(dto.date, dto.room, dto.status);
    return this.bookingModel.create(newDto);
  }

  async update(id: string, dto: CreateUpdateBookingDto) {
    const newDto = new CreateUpdateBookingDto(dto.date, dto.room, dto.status);
    return this.bookingModel.findByIdAndUpdate(id, newDto).exec();
  }

  async delete(id: string): Promise<HydratedDocument<Booking>> | null {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }
}
