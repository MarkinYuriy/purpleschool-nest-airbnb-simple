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
import { CreateBookingDto } from './dto/createBookingDto';
import { BookingService } from './booking.service';
import { Response } from 'express';
import { UpdateBookingDto } from './dto/updateBookingDto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('getByRoomId/:roomId')
  async getByRoomId(@Param() params: any, @Res() res: Response) {
    const bookings = await this.bookingService.getByRoomId(params.roomId);
    if (!bookings) {
      return res.status(HttpStatus.BAD_REQUEST).json(bookings);
    } else {
      return res.status(HttpStatus.OK).json(bookings);
    }
  }

  @Get('getByDate/:date')
  async getByDate(@Param() params: any, @Res() res: Response) {
    const bookings = await this.bookingService.getByDate(params.date);
    if (!bookings) {
      return res.status(HttpStatus.BAD_REQUEST).json(bookings);
    } else {
      return res.status(HttpStatus.OK).json(bookings);
    }
  }

  @Post('create')
  async create(@Body() dto: CreateBookingDto, @Res() res: Response) {
    const booking = await this.bookingService.create(dto);
    if (booking && booking) {
      return res.status(HttpStatus.CREATED).json(booking);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json(booking);
    }
  }

  @Patch('update/:id')
  async update(
    @Param() params: any,
    @Body() dto: UpdateBookingDto,
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
    @Body() dto: CreateBookingDto,
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
