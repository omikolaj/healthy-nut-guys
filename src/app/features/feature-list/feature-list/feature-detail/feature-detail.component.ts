import { FeaturesFacadeService } from './../../../features-facade.service';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';
import { ItemDetails } from 'app/core/models/item-details.model';

@Component({
  selector: 'thng-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDetailComponent implements OnInit {
  itemDetails: ItemDetails;
  constructor(
    private route: ActivatedRoute,
    private facade: FeaturesFacadeService
  ) {}

  ngOnInit(): void {
    this.itemDetails = this.route.snapshot.data['itemDetails'];
  }

  onAddToCart(): void {
    this.facade.addToCart(this.itemDetails.id);
  }
}
