import { IUser } from './../../core/user/Shared/iuser';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, take, throwError } from 'rxjs';
import { LoginService } from 'src/app/core/login/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private service: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: IUser;

    this.service.currentUser$.pipe(take(1)).subscribe((user) => {
      currentUser = user;

      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
    });

    return next.handle(request);
  }
}
