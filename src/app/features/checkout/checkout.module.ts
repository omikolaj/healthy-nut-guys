import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './checkout/confirmation/confirmation.component';
import { InformationComponent } from './checkout/information/information.component';
import { ShippingComponent } from './checkout/shipping/shipping.component';
import { OrderSummaryComponent } from './checkout/order-summary/order-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';

@NgModule({
  declarations: [ConfirmationComponent, InformationComponent, ShippingComponent, OrderSummaryComponent, CheckoutComponent],
  imports: [CommonModule, CheckoutRoutingModule, SharedModule]
})
export class CheckoutModule {}
