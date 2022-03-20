import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Component to show navbar and table. It has role as home page.
 */
@Component({
  selector: 'sw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
