import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, retry, take } from 'rxjs';
import { CrudServico } from 'src/app/Shared/crud.service';
import { ISpeaker } from './ispeaker.interface';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService extends CrudServico<ISpeaker> {
  constructor(protected injector: Injector) {
    super('https://localhost:7217/api/v1/speakers', injector);
  }

  private readonly EndUrl = 'https://localhost:7217/api/v1/speakers';

  getByIdComplete(id: string): Observable<ISpeaker> {
    return this.http
      .get<ISpeaker>(`${this.URL}/complete/${id}`)
      .pipe(retry(5), take(1), catchError(this.handleError));
  }

  uploadImage(idSpeaker: string, file: File): Observable<ISpeaker> {
    const FILE_TO_UPLOAD = file[0] as File;
    const FORM_DATA = new FormData();
    FORM_DATA.append('file', FILE_TO_UPLOAD);

    return this.http.post<ISpeaker>(
      `${this.EndUrl}/updalod-image/${idSpeaker}`,
      FORM_DATA
    );
  }
}
