import { OfferScope } from '../enum/offer-scope.enum';
import { OfferType } from '../enum/offer-type.enum';
import { PromoCode } from './promo-code.model';
import { Offer } from './offer.model';

export interface SpecialOffer extends Offer {
  id: string;
  displayMessage?: string;
  scope: OfferScope;
  promoCode: PromoCode;
}
