import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError, catchError } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { IUser } from './../user/Shared/iuser';
import { Ilogin } from './ilogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserSource = new ReplaySubject<IUser>(1);
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  public login(source: Ilogin): Observable<void> {
    return this.http
      .post<IUser>('https://localhost:7217/api/v1/login', source)
      .pipe(
        take(1),
        map((response: IUser) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
          }
        })
      );
  }

  public setCurrentUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();
  }
}
