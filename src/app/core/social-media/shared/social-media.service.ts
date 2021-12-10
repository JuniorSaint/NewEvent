import { Injectable, Injector } from '@angular/core';
import { CrudServico } from 'src/app/Shared/crud.service';
import { ISocialMedia } from './isocial-media';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService extends CrudServico<ISocialMedia>{

  constructor(protected injector: Injector) {
    super('https://localhost:5001/api/v1/socialmedias', injector);
  }
}
