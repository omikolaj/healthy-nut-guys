import { MatSliderModule } from '@angular/material/slider';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';

@Component({
  selector: 'thng-join-subscription',
  templateUrl: './join-subscription.component.html',
  styleUrls: ['./join-subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinSubscriptionComponent implements OnInit {
  selected = 'monthly';
  constructor() {}

  ngOnInit(): void {}
}
