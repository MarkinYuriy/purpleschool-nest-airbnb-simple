import { Injectable } from '@nestjs/common';
import { HydratedDocument, Model } from 'mongoose';
import { Room, RoomDocument } from './models/room.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUpdateRoomDto } from './dto/createUpdate.room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async getById(id: string): Promise<HydratedDocument<Room>> | null {
    return this.roomModel.findById(id).exec();
  }

  async getList() {
    return this.roomModel.find({}).exec();
  }

  async create(dto: CreateUpdateRoomDto): Promise<HydratedDocument<Room>> {
    return this.roomModel.create(dto);
  }

  async update(
    id: string,
    dto: CreateUpdateRoomDto,
  ): Promise<HydratedDocument<Room>> | null {
    return this.roomModel.findByIdAndUpdate(id, dto).exec();
  }

  async delete(id: string): Promise<HydratedDocument<Room>> | null {
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}
