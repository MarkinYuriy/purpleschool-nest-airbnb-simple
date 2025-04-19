import { BookingStatus } from '../../Common/common.enums';

export class CreateUpdateBookingDto {
  private readonly _date: Date;
  private readonly _room: string;
  private readonly _status?: BookingStatus;

  constructor(date: string | Date, room: string, status?: BookingStatus) {
    if (typeof date === 'string') {
      const targetDate = new Date(date); // Or passed in from a DTO
      const start = new Date(targetDate);
      start.setHours(0, 0, 0, 0);
      this._date = start;
    } else {
      date.setHours(0, 0, 0, 0);
      this._date = date;
    }

    this._room = room;
    this._status = status;
  }

  get status(): BookingStatus {
    return this._status;
  }

  get date(): Date {
    return this._date;
  }

  get room(): string {
    return this._room;
  }
}
