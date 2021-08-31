import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveRoutingModule } from './active-routing.module';
import { ActiveComponent } from './active.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerLegalAgeModule } from '../../../../@shared/calendar/date-picker-legal-age/date-picker-legal-age.module';


@NgModule({
  declarations: [
    ActiveComponent
  ],
  imports: [
    CommonModule,
    ActiveRoutingModule,
    ReactiveFormsModule,
    DatePickerLegalAgeModule
  ]
})
export class ActiveModule { }
