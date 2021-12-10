import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerRoutingModule } from './speaker-routing.module';
import { SpeakerFormComponent } from '../speaker-form/speaker-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/Shared/material.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SpeakerListComponent } from '../speaker-list/speaker-list.component';
import { SpeakerDetailComponent } from '../speaker-detail/speaker-detail.component';

// Configuração de máscara
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
    dropSpecialCharacters: false,
  };
};

@NgModule({
  declarations: [
    SpeakerFormComponent,
    SpeakerListComponent,
    SpeakerDetailComponent,
  ],
  imports: [
    CommonModule,
    SpeakerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
})
export class SpeakerModule {}
