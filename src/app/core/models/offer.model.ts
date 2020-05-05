import { OfferType } from '../enum/offer-type.enum';

export interface Offer {
  discountValue?: number;
  type: OfferType;
}
