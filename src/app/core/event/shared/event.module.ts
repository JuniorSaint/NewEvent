import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { EventRoutingModule } from './event-routing.module';
import { EventFormComponent } from '../event-form/event-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from '../event-list/event-list.component';
import { MaterialModule } from 'src/app/Shared/material.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';

// Configuração de máscara
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
    dropSpecialCharacters: false,
  };
};

// configuracao do locale pt-BR
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { NgxPaginationModule } from 'ngx-pagination';

registerLocaleData(ptBr);

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  declarations: [EventFormComponent, EventListComponent, EventDetailComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
})
export class EventModule {}
