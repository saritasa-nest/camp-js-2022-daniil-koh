import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/** Check date, then transform it.*/
@Pipe({
  name: 'swDate',
})
export class SwDatePipe implements PipeTransform {
  /**
   * @inheritDoc
   * @param date Date value.
   * @param format String form to show by.
   */
  public transform(date: Date, format = 'yyyy-MM-dd'): string | null {
    if (!isNaN(date.getTime())) {
      return new DatePipe('en-US').transform(date, format);
    }
    return '';
  }

}
