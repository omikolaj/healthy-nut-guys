import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'thng-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  panelOpenState = false;
  private _isLargeScreen;
  get isLargeScreen() {
    return this._isLargeScreen;
  }
  set isLargeScreen(value: boolean) {
    this._isLargeScreen = value;
    if (value) {
      this.matExpansionPanel.open();
    } else {
      this.matExpansionPanel.close();
    }
  }

  @ViewChild(MatExpansionPanel, { static: true }) matExpansionPanel: MatExpansionPanel;
  unsubscribe$: Subject<void> = new Subject();

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 992px)'])
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(result => {
          if (result.matches) {
            this.isLargeScreen = true;
          } else {
            this.isLargeScreen = false;
          }
        })
      )
      .subscribe(r => console.log('panel open state is', this.isLargeScreen));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onPanelStateChange(): void {
    this.panelOpenState = !this.panelOpenState;
  }
}
