import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'thng-custom-sack-selector',
  templateUrl: './custom-sack-selector.component.html',
  styleUrls: ['./custom-sack-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSackSelectorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
