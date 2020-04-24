import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { OverviewComponent } from './overview/overview.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { CheckoutInfoComponent } from './checkout-info/checkout-info.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    CartComponent,
    OverviewComponent,
    PersonalInfoComponent,
    CheckoutInfoComponent,
    ConfirmationComponent
  ],
  imports: [CommonModule, CartRoutingModule, SharedModule]
})
export class CartModule {}
