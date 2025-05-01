import { BOOKING_STATUS } from '../booking.enums';

export class UpdateBookingDto {
  date: string;
  room: string;
  status?: BOOKING_STATUS;
}
