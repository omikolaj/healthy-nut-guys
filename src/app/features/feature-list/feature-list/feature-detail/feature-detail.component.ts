import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'thng-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('inside ngonit');
  }
}
