import { IInterfacePadrao } from 'src/app/Shared/iinterface.stander';

export interface IUser extends IInterfacePadrao {
  id?: string;
  userName: string;
  email: string;
  password: string;
  repPassword: string;
  isActive: string;
  userType: string;
  token?: string;
  userImage: string;
  phoneNumber: string;
  UpdatedAt?: Date;
  CreatedAt?: Date;
}
