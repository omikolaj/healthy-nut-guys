import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'thng-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent implements OnInit {
  panelOpenState = false;
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.Large]);
  }

  ngOnInit(): void {}
}
