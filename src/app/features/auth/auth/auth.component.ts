import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'thng-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
