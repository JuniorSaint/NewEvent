import { IInterfacePadrao } from 'src/app/Shared/iinterface.stander';

export interface ISocialMedia extends IInterfacePadrao {

    id?: string;
    socialMedia: string;
    url: string;
    eventId?: number;
    speakerId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
