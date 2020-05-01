import { shopItems, itemDetails } from './../../product-list.data';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ItemDetails } from 'app/core/models/item-details.model';
import { ActivatedRoute } from '@angular/router';
import { FeaturesFacadeService } from 'app/features/features-facade.service';
import { CartItem } from 'app/core/models/cart-items.model';
import * as uuid from 'uuid';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'thng-product-detail-custom-sack',
  templateUrl: './product-detail-custom-sack.component.html',
  styleUrls: ['./product-detail-custom-sack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailCustomSackComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  itemDetails: ItemDetails;
  constructor(private route: ActivatedRoute, private facade: FeaturesFacadeService) {}

  ngOnInit(): void {
    this.itemDetails = itemDetails.find(i => i.title.toLocaleLowerCase().includes('custom'));
  }

  onAddToCart(): void {
    const cartItem: CartItem = {
      ...this.itemDetails,
      cartItemId: uuid()
    };
    this.facade.addToCart(cartItem);
  }
}
