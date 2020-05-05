import { OfferType } from './../enum/offer-type.enum';
import { Offer } from './offer.model';
export interface PromoCode extends Offer {
  id: string;
  code: string;
}
