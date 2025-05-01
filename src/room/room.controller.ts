import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create.room.dto';
import { Response } from 'express';
import { Room } from './models/room.model';
import { UpdateRoomDto } from './dto/update.room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('get/:id')
  async get(@Param() params: any, @Res() res: Response) {
    this.roomService
      .getById(params.id)
      .then((room: Room) => {
        if (room) {
          return res.status(HttpStatus.OK).json(room);
        } else {
          return res.status(HttpStatus.BAD_REQUEST).json(`id not found`);
        }
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err });
      });
  }

  @Get('getList')
  async getList(@Res() res: Response) {
    this.roomService
      .getList()
      .then((rooms: Room[]) => {
        // if (!rooms) {
        //   return res.status(HttpStatus.BAD_REQUEST).json(rooms);
        /// } else {
        return res.status(HttpStatus.OK).json(rooms);
        // }
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err });
      });
  }

  @Post('create')
  async create(@Body() dto: CreateRoomDto, @Res() res: Response) {
    this.roomService
      .create(dto)
      .then((room) => {
        if (room && room._id) {
          return res.status(HttpStatus.CREATED).json(room);
        } else {
          return res.status(HttpStatus.BAD_REQUEST).json(room);
        }
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
      });
  }

  @Patch('update/:id')
  async update(
    @Param()
    params: any,
    @Body()
    dto: UpdateRoomDto,
    @Res()
    res: Response,
  ) {
    this.roomService
      .update(params.id, dto)
      .then((room) => {
        if (room && room._id) {
          return res.status(HttpStatus.CREATED).json(room);
        } else {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: `id not fond` });
        }
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
      });
  }

  @Delete('delete/:id')
  async delete(
    @Param()
    params: any,
    @Res() res: Response,
  ) {
    this.roomService
      .delete(params.id)
      .then((room) => {
        if (room && room._id) {
          return res.status(HttpStatus.CREATED).json(room);
        } else {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: `id not fond` });
        }
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
      });
    // todo delete all booking for room
  }
}
