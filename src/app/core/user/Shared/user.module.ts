import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/Shared/material.module';
import { UserListComponent } from '../user-list/user-list.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';

// Configuração de máscara
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
    dropSpecialCharacters: false,
  };
};

@NgModule({
  declarations: [UserFormComponent, UserListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
})
export class UserModule {}
