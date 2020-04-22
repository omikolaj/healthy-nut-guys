import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { Feature, features } from '../feature-list.data';

@Component({
  selector: 'thng-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: Feature[] = features;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  openLink(link: string) {
    window.open(link, '_blank');
  }

  onViewProductDetail(feature: Feature): void {
    this.router.navigate([`${feature.id}`], {
      relativeTo: this.route.parent
    });
  }
}
