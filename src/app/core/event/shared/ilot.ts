import { IInterfacePadrao } from 'src/app/Shared/iinterface.stander';
import { IEvent } from './ievent';

export interface Ilot extends IInterfacePadrao {
  id?: string;
  lotName: string;
  price: number;
  initialDate: Date;
  endDate: Date;
  amount: number;
  eventId: string;
  event: IEvent;
}
