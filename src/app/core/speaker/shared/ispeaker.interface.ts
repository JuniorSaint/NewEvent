import { IEvent } from './../../event/shared/ievent';
import { IInterfacePadrao } from 'src/app/Shared/iinterface.stander';
import { ISocialMedia } from '../../social-media/shared/isocial-media';

export interface ISpeaker extends IInterfacePadrao {
  id?: string;
  speakerName: string;
  miniResume: string;
  speakerImage: string;
  speakerPhone: string;
  speakerEmail: string;
  birthday: Date;
  socialMedias: ISocialMedia[];
  speakerEvent: IEvent[];
  age: number;
  updatedAt?: Date;
  createdAt?: Date;
}
