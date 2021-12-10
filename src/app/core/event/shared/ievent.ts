import { Time } from '@angular/common';
import { IInterfacePadrao } from 'src/app/Shared/iinterface.stander';
import { ISocialMedia } from '../../social-media/shared/isocial-media';
import { ISpeaker } from '../../speaker/shared/ispeaker.interface';
import { Ilot } from './ilot';

export interface IEvent extends IInterfacePadrao {
  id?: string;
  local: string;
  eventDate: Date;
  eventTime: Time;
  theme: string;
  peopleAmount: number;
  lots: Ilot[];
  speakers: ISpeaker[];
  socialMedias: ISocialMedia[];
  phone: string;
  email: string;
  eventImage: string;
  updatedAt?: Date;
  ureatedAt?: Date;
}
