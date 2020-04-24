import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { InformationComponent } from './information/information.component';
import { ShippingComponent } from './shipping/shipping.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [CartComponent, ConfirmationComponent, InformationComponent, ShippingComponent, OrderSummaryComponent, CheckoutComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule]
})
export class CartModule {}
