import { Injectable, Injector } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';
import { CrudServico } from 'src/app/Shared/crud.service';

import { IEvent } from './ievent';

@Injectable({
  providedIn: 'root',
})
export class EventService extends CrudServico<IEvent> {
  private readonly EndUrl = 'https://localhost:7217/api/v1/events';
  constructor(protected injector: Injector) {
    super('https://localhost:7217/api/v1/events', injector);
  }

  getByIdComplete(id: string): Observable<IEvent> {
    return this.http
      .get<IEvent>(`${this.URL}/complete/${id}`)
      .pipe(retry(5), take(1), catchError(this.handleError));
  }

  uploadImage(eventId: string, file: File): Observable<Event> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http.post<Event>(
      `${this.EndUrl}/updalod-image/${eventId}`,
      formData
    );
  }
}
