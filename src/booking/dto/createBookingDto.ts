import { BOOKING_STATUS } from '../booking.enums';

export class CreateBookingDto {
  date: string;
  room: string;
  status?: BOOKING_STATUS;
}
