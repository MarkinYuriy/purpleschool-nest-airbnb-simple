import { ROOM_CLASS } from '../../Common/common.enums';

export class CreateUpdateRoomDto {
  private readonly _num: number;
  private readonly _class: ROOM_CLASS;
  private readonly _balcony: boolean;

  constructor(num: number, class_: ROOM_CLASS, balcony: boolean) {
    this._num = num;
    this._class = class_;
    this._balcony = balcony;
  }

  get num(): number {
    return this._num;
  }

  get class(): ROOM_CLASS {
    return this._class;
  }

  get balcony(): boolean {
    return this._balcony;
  }
}
