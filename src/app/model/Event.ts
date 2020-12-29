import {EventPrice} from './EventPrice';
import {Show} from './Show';
import {EventRoom} from './EventRoom';

export interface Event {
  id: number;
  startDate: string;
  endDate: string;
  startTimes: string[];
  price: EventPrice;
  show: Show;
  room: EventRoom;
}
