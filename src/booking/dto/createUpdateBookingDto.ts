import { BookingStatus } from '../../Common/common.enums';

export class CreateUpdateBookingDto {
  private readonly _date: string;
  private readonly _room: string;
  private readonly _status?: BookingStatus;

  constructor(date: string, room: string, status?: BookingStatus) {
    const targetDate = new Date(date); // Or passed in from a DTO
    const start = new Date(targetDate);
    start.setHours(0, 0, 0, 0);
    this._date = start.toLocaleDateString();
    this._room = room;
    this._status = status;
  }

  get status(): BookingStatus {
    return this._status;
  }

  get date(): string {
    return this._date;
  }

  get room(): string {
    return this._room;
  }
}
