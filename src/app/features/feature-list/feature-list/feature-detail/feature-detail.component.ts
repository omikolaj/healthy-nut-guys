import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ItemDetails } from 'app/core/models/item-details.model';

@Component({
  selector: 'thng-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDetailComponent implements OnInit {
  itemDetails: ItemDetails;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.itemDetails = this.route.snapshot.data['itemDetails'];
  }
}
