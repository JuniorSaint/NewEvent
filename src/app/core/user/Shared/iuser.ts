import { IInterfacePadrao } from 'src/app/Shared/iinterface.stander';

export interface IUser extends IInterfacePadrao {
  id?: string;
  userName: string;
  userEmail: string;
  password: string;
  repPassword: string;
  isActive: boolean;
  userType: string;
  token?: string;
  userImage: string;
  phoneNumber: string;
  dateBirthday?: Date;
  UpdatedAt?: Date;
  CreatedAt?: Date;
}
