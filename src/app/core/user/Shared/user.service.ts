import { Injectable, Injector } from '@angular/core';
import { CrudServico } from 'src/app/Shared/crud.service';
import { IUser } from './iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudServico<IUser> {
  constructor(protected injector: Injector) {
    super('https://localhost:7217/api/v1/users', injector);
  }
}
