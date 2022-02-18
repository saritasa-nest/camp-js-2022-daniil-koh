import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sw-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
