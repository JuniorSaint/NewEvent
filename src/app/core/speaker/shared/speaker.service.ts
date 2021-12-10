import { Injectable, Injector } from '@angular/core';
import { CrudServico } from 'src/app/Shared/crud.service';
import { ISpeaker } from './ispeaker.interface';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService extends CrudServico<ISpeaker> {
  constructor(protected injector: Injector) {
    super('https://localhost:7217/api/v1/speakers', injector);
  }
}
