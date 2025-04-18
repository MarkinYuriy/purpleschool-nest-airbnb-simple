import { RoomClass } from '../../Common/common.enums';

export class CreateUpdateRoomDto {
  num: number;
  class: RoomClass;
  balcony: boolean;
}
