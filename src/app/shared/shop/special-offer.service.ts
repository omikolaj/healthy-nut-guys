import { Injectable } from '@angular/core';
import { SpecialOffer } from 'app/core/models/special-offer.model';
import { OfferType } from 'app/core/enum/offer-type.enum';
import { OfferScope } from 'app/core/enum/offer-scope.enum';
import { Offer } from 'app/core/models/offer.model';

@Injectable()
export class SpecialOfferService {
  constructor() {}

  determineOfferMessage(offer: SpecialOffer): string {
    let message = '';
    switch (offer.scope) {
      case OfferScope.Shop:
        if (offer.type === OfferType.PromoCode) {
          message = `${this.getShopOffersMessage(offer.promoCode, offer.promoCode.type)} with promo code: ${offer.promoCode.code}`;
        } else {
          message = this.getShopOffersMessage(offer, offer.type);
        }
        break;

      case OfferScope.PromoCode:
        break;

      case OfferScope.Subscription:
        break;

      default:
        break;
    }
    return message;
  }

  private getShopOffersMessage(offer: Offer, offerType: OfferType): string {
    let message: string;

    switch (offerType) {
      case OfferType.AmountOff:
        message = `Get $${offer.discountValue} off your purchase`;
        break;

      case OfferType.PercentOff:
        message = `Get ${offer.discountValue}% off your purchase`;
        break;

      case OfferType.FreeShipping:
        message = `Get free shipping on all products`;
        break;

      case OfferType.FreeStickers:
        message = `Get free stickers with any purchase`;
        break;

      case OfferType.Special:
        break;

      default:
        break;
    }

    return message;
  }
}
