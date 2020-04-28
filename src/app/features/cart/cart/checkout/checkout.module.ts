import { SharedModule } from '../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './checkout/confirmation/confirmation.component';
import { ShippingComponent } from './checkout/shipping/shipping.component';
import { OrderSummaryComponent } from './checkout/order-summary/order-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { ExpressCheckoutComponent } from './checkout/express-checkout/express-checkout.component';
import { PaymentComponent } from './checkout/payment/payment.component';
import { PersonalSummaryInfoComponent } from './checkout/personal-summary-info/personal-summary-info.component';
import { ShippingMethodsComponent } from './checkout/shipping-methods/shipping-methods.component';
import { JoinSubscriptionComponent } from './checkout/join-subscription/join-subscription.component';

@NgModule({
  declarations: [
    ConfirmationComponent,
    ShippingComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    ExpressCheckoutComponent,
    PaymentComponent,
    PersonalSummaryInfoComponent,
    ShippingMethodsComponent,
    JoinSubscriptionComponent
  ],
  imports: [CommonModule, CheckoutRoutingModule, SharedModule]
})
export class CheckoutModule {}
