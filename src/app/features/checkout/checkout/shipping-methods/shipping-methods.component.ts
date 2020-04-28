import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'thng-shipping-methods',
  templateUrl: './shipping-methods.component.html',
  styleUrls: ['./shipping-methods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingMethodsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
