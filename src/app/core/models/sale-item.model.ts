import { PromoCode } from './promo-code.model';
import { OfferType } from './../enum/offer-type.enum';
import { Moment } from 'moment';
import { SpecialOffer } from './special-offer.model';

export interface SaleItem {
  id?: string;
  promoCodeId?: string;
  customProductId?: string;
  specialOfferId?: string;
  productId?: string;
  expireDate?: Moment;
  type?: OfferType;
  discountValue?: number;
  specialOffer?: SpecialOffer;
  promoCode?: PromoCode;
  salePrice?: number;
}
