import { Frequency } from './frequency.enum';
import { Moment } from 'moment';
import { UserSubscriptionProduct } from './user-subscription-product.model';
export interface UserSubscription {
  id?: string;
  nextDelivery?: Moment;
  modified?: Moment;
  frequency?: Frequency;
  userSubscriptions?: UserSubscriptionProduct[];
}
