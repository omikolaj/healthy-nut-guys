import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'thng-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
