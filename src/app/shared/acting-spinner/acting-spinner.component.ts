import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'thng-acting-spinner',
  templateUrl: './acting-spinner.component.html',
  styleUrls: ['./acting-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActingSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
