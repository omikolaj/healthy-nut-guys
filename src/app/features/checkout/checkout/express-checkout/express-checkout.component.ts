import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'thng-express-checkout',
  templateUrl: './express-checkout.component.html',
  styleUrls: ['./express-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpressCheckoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
