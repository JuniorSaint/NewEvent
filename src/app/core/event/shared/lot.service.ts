import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { CrudServico } from 'src/app/Shared/crud.service';
import { Ilot } from './ilot';

@Injectable({
  providedIn: 'root',
})
export class LotService extends CrudServico<Ilot> {
  private readonly EndUrl = 'https://localhost:7217/api/v1/lots';

  constructor(protected injector: Injector) {
    super('https://localhost:7217/api/v1/lots', injector);
  }

  createLote(idEvent: string, source: Ilot): Observable<Ilot[]> {
    return this.http
      .put<Ilot[]>(`${this.EndUrl}/${idEvent}`, source, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((dados) => dados),
        catchError(this.handleError)
      );
  }

  public getByEvent(id: string): Observable<Ilot[]> {
    return this.http
      .get<Ilot[]>(`${this.EndUrl}/${id}`)
      .pipe(retry(5), take(1), catchError(this.handleError));
  }

  deleteLot(id: string, idEvent: string): Observable<Ilot> {
    return this.http
      .delete<Ilot>(`${this.EndUrl}/${id}/${idEvent}`)
      .pipe(catchError(this.handleError));
  }
}
