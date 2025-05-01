import { BOOKING_STATUS } from '../../Common/common.enums';

export class CreateUpdateBookingDto {
  private readonly _date: string;
  private readonly _room: string;
  private readonly _status?: BOOKING_STATUS;

  constructor(date: string, room: string, status?: BOOKING_STATUS) {
    this._date = date;
    this._room = room;
    this._status = status;
  }



  get status(): BOOKING_STATUS {
    return this._status;
  }

  get date(): string {
    return this._date;
  }

  get room(): string {
    return this._room;
  }
}
