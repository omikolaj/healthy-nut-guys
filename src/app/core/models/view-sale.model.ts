import { SaleItem } from './sale-item.model';
import { OfferType } from './offer-type.enum';

export interface ViewSale {
  sales?: SaleItem[];
  isOnSale?: boolean;
  price?: number;
  type?: OfferType;
  salePrice?: number;
}
