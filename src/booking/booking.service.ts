import { Injectable } from '@nestjs/common';
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
    newDate.setHours(0, 0, 0, 0);
    return this.bookingModel.find({ date: newDate }).exec();
  }

  async create(dto: CreateUpdateBookingDto) {
    return new Promise<Booking | any>((resolve) => {
      const newDto = {
        date: new Date(dto.date),
        room: dto.room,
        status: dto.status,
      };
      this.roomService
        .getById(dto.room as any)
        .then((room) => {
          if (room) {
            this.bookingModel
              .create(newDto)
              .then((booking) => {
                resolve(booking);
              })
              .catch((err) => {
                resolve({ error: err.message });
              });
          } else {
            resolve({ error: `id room not found` });
          }
        })
        .catch((err) => {
          return { error: err };
        });
    });
  }

  async update(id: string, dto: CreateUpdateBookingDto) {
    const newDto = new CreateUpdateBookingDto(dto.date, dto.room, dto.status);
    return this.bookingModel
      .findByIdAndUpdate(id, newDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<HydratedDocument<Booking>> | null {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }

  async deleteMany(roomId: string) {
    return this.bookingModel.deleteMany({ room: roomId }).exec();
  }
}
