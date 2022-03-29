import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwDatePipe } from './date-formatter.pipe';

/** Module to share all pipes.*/
@NgModule({
  declarations: [SwDatePipe],
  imports: [CommonModule],
  exports: [SwDatePipe],
})
export class PipesModule { }
