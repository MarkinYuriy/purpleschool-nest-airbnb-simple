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
import { CreateUpdateBookingDto } from './dto/createUpdateBookingDto';
import { BookingService } from './booking.service';
import { Response } from 'express';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('get/:roomId')
  async getByRoomId(@Param() params: any, @Res() res: Response) {
    const bookings = await this.bookingService.getByRoomId(params.roomId);
    if (!bookings) {
      return res.status(HttpStatus.BAD_REQUEST).json(bookings);
    } else {
      return res.status(HttpStatus.OK).json(bookings);
    }
  }

  @Get('get/:date')
  async getByDate(@Param() params: any, @Res() res: Response) {
    const bookings = await this.bookingService.getByDate(params.roomId);
    if (!bookings) {
      return res.status(HttpStatus.BAD_REQUEST).json(bookings);
    } else {
      return res.status(HttpStatus.OK).json(bookings);
    }
  }

  @Post('create')
  async create(@Body() dto: CreateUpdateBookingDto, @Res() res: Response) {
    const booking = await this.bookingService.create(dto);
    if (booking && booking._id) {
      return res.status(HttpStatus.CREATED).json(booking);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(booking);
    }
  }

  @Patch('update/:id')
  async update(
    @Param() params: any,
    @Body() dto: CreateUpdateBookingDto,
    @Res() res: Response,
  ) {
    const booking = await this.bookingService.update(params.id, dto);
    if (booking && booking._id) {
      return res.status(HttpStatus.OK).json(booking);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(booking);
    }
  }

  @Delete('delete/:id')
  async delete(
    @Param() params: any,
    @Body() dto: CreateUpdateBookingDto,
    @Res() res: Response,
  ) {
    const booking = await this.bookingService.delete(params.id);
    if (booking && booking._id) {
      return res.status(HttpStatus.OK).json(booking);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(booking);
    }
  }
}
