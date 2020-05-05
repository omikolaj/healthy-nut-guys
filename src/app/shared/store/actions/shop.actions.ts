import { ShopOffer } from './../../../core/models/shop-offer.model';
import { ShopItem } from 'app/core/models/shop-item.model';
import { ItemDetails } from 'app/core/models/item-details.model';

export class InitializeProducts {
  static readonly type = '[Products] InitializeProducts';
  constructor(public products: { [key: string]: ShopItem }) {}
}

export class AddProductDetails {
  static readonly type = '[Products] AddProductDetails';
  constructor(public productDetails: ItemDetails) {}
}

export class AddShopOffer {
  static readonly type = '[Shop] AddShopOffer';
  constructor(public payload: ShopOffer) {}
}
