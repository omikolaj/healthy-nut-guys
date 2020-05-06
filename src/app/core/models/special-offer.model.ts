import { OfferScope } from '../enum/offer-scope.enum';
import { PromoCode } from './promo-code.model';
import { Offer } from './offer.model';
import { OfferType } from '../enum/offer-type.enum';

export interface SpecialOffer extends Offer {
  id: string;
  displayMessage?: string;
  promoCodeId?: string;
  appliesNextOrder?: boolean;
  scope?: OfferScope;
  promoCode?: PromoCode;
  discountValue?: number;
}
