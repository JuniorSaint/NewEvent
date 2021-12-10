import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { SocialMediaFormComponent } from '../social-media-form/social-media-form.component';
import { SocialMediaListComponent } from '../social-media-list/social-media-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/Shared/material.module';


@NgModule({
  declarations: [
    SocialMediaFormComponent,
    SocialMediaListComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SocialMediaModule { }
