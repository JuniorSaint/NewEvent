import { Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { IInterfacePadrao } from './iinterface.stander';
import { PaginatedResult } from './pagination';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudServico<T extends IInterfacePadrao> {
  http: HttpClient;
  URL: string;

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

    return this.http.get<T[]>(this.URL, { observe: 'response', params }).pipe(
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
