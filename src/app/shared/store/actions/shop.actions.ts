import { CustomProduct } from './../../../core/models/custom-product.model';
import { Category } from 'app/core/models/category.model';
import { ProductDetails } from './../../../core/models/product-details.model';
import { ShopItem } from 'app/core/models/shop-item.model';
import { ItemDetails } from 'app/core/models/item-details.model';
import { SpecialOffer } from 'app/core/models/special-offer.model';
import { Product } from 'app/core/models/product.model';
import { Tag } from 'app/core/models/tag.model';
import { SaleItem } from 'app/core/models/sale-item.model';

export class InitializeProducts {
  static readonly type = '[Products] InitializeProducts';
  constructor(public payload: { [key: string]: Product }) {}
}

export class InitializeCustomProducts {
  static readonly type = '[CustomProducts] InitializeCustomProducts';
  constructor(public payload: { [key: string]: CustomProduct }) {}
}

export class InitializeProductDetails {
  static readonly type = '[Products] InitializeProductDetails';
  constructor(public payload: { [key: string]: ProductDetails }) {}
}

export class InitializeMixCategories {
  static readonly type = '[CustomProducts] InitializeMixCategories';
  constructor(public payload: { [key: string]: ProductDetails }) {}
}

export class InitializeIngredients {
  static readonly type = '[CustomProducts] InitializeIngredients';
  constructor(public payload: { [key: string]: ProductDetails }) {}
}

export class InitializeProductSales {
  static readonly type = '[Products] InitializeProductSales';
  constructor(public payload: { [key: string]: SaleItem }) {}
}

export class InitializeCustomProductSales {
  static readonly type = '[CustomProducts] InitializeCustomProductSales';
  constructor(public payload: { [key: string]: SaleItem }) {}
}

export class InitializeCategories {
  static readonly type = '[Products] InitializeCategories';
  constructor(public payload: { [key: string]: Category }) {}
}

export class InitializeProductTags {
  static readonly type = '[Products] InitializeProductTags';
  constructor(public payload: { [key: string]: Tag }) {}
}

export class InitializeCustomProductTags {
  static readonly type = '[CustomProducts] InitializeCustomProductTags';
  constructor(public payload: { [key: string]: Tag }) {}
}

export class AddProductDetails {
  static readonly type = '[Products] AddProductDetails';
  constructor(public productDetails: ItemDetails) {}
}

export class AddShopOffer {
  static readonly type = '[Shop] AddShopOffer';
  constructor(public payload: SpecialOffer) {}
}
