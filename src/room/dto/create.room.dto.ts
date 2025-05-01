import { ROOM_CLASS } from '../room.enums';

export class CreateRoomDto {
  num: number;
  class: ROOM_CLASS;
  balcony: boolean;
}
