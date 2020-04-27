import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'thng-personal-summary-info',
  templateUrl: './personal-summary-info.component.html',
  styleUrls: ['./personal-summary-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalSummaryInfoComponent implements OnInit {
  @Output() changeInfoEvent: EventEmitter<{ tabIndex: number; focusOn: 'contact' | 'shipping' }> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onEditContact(): void {
    // navigate back to previous page focus in contact
    this.changeInfoEvent.emit({ tabIndex: 0, focusOn: 'contact' });
  }

  onEditShipping(): void {
    // navigate back to previous page focus on shipping
    this.changeInfoEvent.emit({ tabIndex: 0, focusOn: 'shipping' });
  }
}
