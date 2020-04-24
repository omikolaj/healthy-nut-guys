import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'thng-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrls: ['./checkout-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutInfoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
