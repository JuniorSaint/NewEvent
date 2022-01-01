import { IInterfacePadrao } from 'src/app/Shared/iinterface.stander';

export interface IUser extends IInterfacePadrao {
  id?: string;
  userName: string;
  UserEmail: string;
  password: string;
  repPassword: string;
  isActive: string;
  userType: string;
  token?: string;
  userImage: string;
  phoneNumber: string;
  dateBirthday?: Date;
  UpdatedAt?: Date;
  CreatedAt?: Date;
}
