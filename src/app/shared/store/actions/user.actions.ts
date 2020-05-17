import { UserSubscription } from './../../../core/models/user-subscription.model';
export class AddUserSubscription {
  static readonly type = '[User] AddUserSubscription';
  constructor(public payload: UserSubscription | null) {}
}
