import { BreakpointObserver } from '@angular/cdk/layout';
import { FeaturesFacadeService } from '../../features-facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { tap, takeUntil } from 'rxjs/operators';
import { CartItem } from 'app/core/models/cart-items.model';
import { Subject } from 'rxjs';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'thng-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  shippingAddress = 'Shipping Address';
  elementFocus: 'contact' | 'shipping';
  overviewFormGroup: FormGroup;
  tabIndex: number;
  infoFormGroup: FormGroup;
  checkoutFormGroup: FormGroup;
  confirmationFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}

  private initForms(cartItems: CartItem[]): void {
    this.initOverviewForm(cartItems);
    this.initInfoForm();
    this.initCheckoutForm();
    this.initConfirmationForm();
  }

  private initOverviewForm(cartItems: CartItem[]): void {
    // have to be created based on what has been added to the cart
    const cartItemsQuantitiesControls = cartItems.map(item => {
      return this.fb.group({
        id: item.id,
        quantity: cartItems.reduce((total, x) => (x.cartItemId === item.cartItemId ? total + 1 : total), 0)
      });
    });

    this.overviewFormGroup = this.fb.group({
      cartItems: this.fb.array(cartItemsQuantitiesControls)
    });
  }

  private initInfoForm(): void {
    this.infoFormGroup = this.fb.group({
      customerInfo: this.fb.group({
        firstName: this.fb.control('', Validators.required),
        lastName: this.fb.control('', Validators.required),
        email: this.fb.control('', [Validators.required, Validators.email]),
        phone: this.fb.control('', Validators.pattern('[0-9]{0,10}'))
      }),
      shippingInfo: this.fb.array([this.createShippingInfo()]),
      sameAsShipping: this.fb.control(true)
    });
  }

  private createShippingInfo(): FormGroup {
    return this.fb.group({
      street: this.fb.control('', Validators.required),
      city: this.fb.control('', Validators.required),
      zipCode: this.fb.control('', Validators.required),
      state: this.fb.control('', Validators.required)
    });
  }

  private initCheckoutForm(): void {
    this.checkoutFormGroup = this.fb.group({
      cardInfo: this.fb.group({
        number: this.fb.control('', Validators.required),
        expDate: this.fb.control('', Validators.required),
        cvc: this.fb.control('', Validators.required),
        zip: this.fb.control('', Validators.required)
      })
    });
  }

  private initConfirmationForm(): void {}

  onUpdateInfo(event: { tabIndex: number; focusOn: 'contact' | 'shipping' }): void {
    this.tabIndex = event.tabIndex;
    this.elementFocus = event.focusOn;
  }

  onTabSelectionChange(event: StepperSelectionEvent): void {
    this.tabIndex = event.selectedIndex;
  }
}
