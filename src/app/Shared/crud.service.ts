import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';

import { IInterfacePadrao } from './iinterface.stander';
import { PaginatedResult } from './pagination';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudServico<T extends IInterfacePadrao> {
  http: HttpClient;
  URL: string;
  tokenHeader = new HttpHeaders({
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
  });

  constructor(@Inject(String) API: string, injector: Injector) {
    this.http = injector.get(HttpClient);
    this.URL = API;
  }

  public get(): Observable<T[]> {
    return this.http
      .get<T[]>(this.URL)
      .pipe(retry(5), catchError(this.handleError));
  }

  public getByID(id: string): Observable<T> {
    return this.http
      .get<T>(`${this.URL}/${id}`)
      .pipe(retry(5), take(1), catchError(this.handleError));
  }

  public getByPagination(
    page?: number,
    itemsPerPage?: number,
    term?: string
  ): Observable<PaginatedResult<T[]>> {
    const paginatedResult: PaginatedResult<T[]> = new PaginatedResult<T[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '') params = params.append('term', term);

    return this.http
      .get<T[]>(this.URL, {
        headers: this.tokenHeader,
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  public create(source: T): Observable<T> {
    return this.http
      .post<T>(`${this.URL}`, source, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((dados) => dados),
        catchError(this.handleError)
      );
  }

  public update(source: T): Observable<T> {
    return this.http
      .put<T>(`${this.URL}`, source, {
        headers: new HttpHeaders({ 'contente-Type': 'application/json' }),
      })
      .pipe(
        map((dados) => dados),
        catchError(this.handleError)
      );
  }

  public delete(id: string): Observable<T> {
    return this.http
      .delete<T>(`${this.URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
