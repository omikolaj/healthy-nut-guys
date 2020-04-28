import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, Input, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'thng-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingComponent implements OnInit {
  @Input() title: string;
  @Input() emailFormTemplate: TemplateRef<HTMLElement>;
  @Input() emailOfferCheckbox: TemplateRef<HTMLElement>;
  @Input() set focusOn(value: 'contact' | 'shipping') {
    this.onEditInfo(value);
  }
  @ViewChild('contactInfo', { static: true }) contactInfoFirstNode: ElementRef;
  @ViewChild('shippingInfo', { static: true }) shippingInfoFirstNode: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onEditInfo(focusOn: 'contact' | 'shipping'): void {
    if (focusOn === 'contact') {
      setTimeout(() => {
        this.contactInfoFirstNode.nativeElement.focus();
      }, 100);
    } else if (focusOn === 'shipping') {
      setTimeout(() => {
        this.shippingInfoFirstNode.nativeElement.focus();
      }, 100);
    }
  }
}
