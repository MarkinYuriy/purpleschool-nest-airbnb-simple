import { ROOM_CLASS } from '../room.enums';

export class UpdateRoomDto {
  num: number;
  class: ROOM_CLASS;
  balcony: boolean;
}
