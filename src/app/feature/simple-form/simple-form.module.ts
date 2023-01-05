import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleFormRoutingModule } from './simple-form-routing.module';
import { SimpleFormComponent } from './simple-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SimpleFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SimpleFormRoutingModule
  ]
})
export class SimpleFormModule { }
