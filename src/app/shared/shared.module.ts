import { NgxErrorInputComponent } from './components/ngx-error-input/ngx-error-input.component';
import { NgxInputComponent } from './components/ngx-input/ngx-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgxInputComponent,
    NgxErrorInputComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxInputComponent,
    NgxErrorInputComponent,
  ]
})
export class SharedModule { }
