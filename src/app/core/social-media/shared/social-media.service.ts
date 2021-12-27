import { IlistSocialMedia } from './ilist-social-media';
import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, map, Observable, retry, take } from 'rxjs';
import { CrudServico } from 'src/app/Shared/crud.service';
import { ISocialMedia } from './isocial-media';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService extends CrudServico<ISocialMedia> {
  constructor(protected injector: Injector) {
    super('https://localhost:7217/api/v1/socialmedias', injector);
  }

  private readonly EndUrl = 'https://localhost:7217/api/v1/socialmedias';
  private readonly EndUrlList =
    'https://localhost:7217/api/v1/listsocialmedias';

  createSocialMedia(
    idSpeaker: string,
    source: ISocialMedia
  ): Observable<ISocialMedia[]> {
    return this.http
      .put<ISocialMedia[]>(`${this.EndUrl}/${idSpeaker}`, source, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((dados) => dados),
        catchError(this.handleError)
      );
  }

  public getBySpeaker(id: string): Observable<ISocialMedia[]> {
    return this.http
      .get<ISocialMedia[]>(`${this.EndUrl}/${id}`)
      .pipe(retry(5), take(1), catchError(this.handleError));
  }

  deleteSocialMedia(id: string, idEvent: string): Observable<ISocialMedia> {
    return this.http
      .delete<ISocialMedia>(`${this.EndUrl}/${id}/${idEvent}`)
      .pipe(catchError(this.handleError));
  }

  listSocialMedia(): Observable<IlistSocialMedia[]> {
    return this.http
      .get<IlistSocialMedia[]>(`${this.EndUrlList}`)
      .pipe(retry(5), take(1), catchError(this.handleError));
  }
}
