import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ilogin } from './ilogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http!: HttpClient;

  constructor() { }

  login(source: Ilogin): Observable<Ilogin> {
    return this.http.post<Ilogin>("https://localhost:5001/api/v1/login", source, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    })
      .pipe(catchError(this.handleError));
  }

  //  Tratamento de erro
  public handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    alert(errorResponse.error.message);
    return throwError(errorResponse.error.message);
  }

}
