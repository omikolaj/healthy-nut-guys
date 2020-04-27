import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { DispatchOutsideZoneNgxsExecutionStrategy } from '@ngxs/store/src/execution/dispatch-outside-zone-ngxs-execution-strategy';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { transition, trigger, style, animate } from '@angular/animations';

@Component({
  selector: 'thng-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('200ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('200ms ease-in', style({ transform: 'translateX(100%)' }))])
    ])
  ]
})
export class PaymentComponent implements OnInit {
  sameAsShipping = true;
  billingAddress = 'Billing Address';
  @Output() updateInfo: EventEmitter<{ tabIndex: number; focusOn: 'contact' | 'shipping' }> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onCheckboxChange(event: MatCheckboxChange): void {
    this.sameAsShipping = event.checked;
  }

  onChangeInfoClicked(event: { tabIndex: number; focusOn: 'contact' | 'shipping' }): void {
    this.updateInfo.emit(event);
  }
}
