import { FeaturesFacadeService } from './../../features-facade.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CartItem } from 'app/core/models/cart-items.model';

@Component({
  selector: 'thng-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  isLinear = true;
  cartItems$ = this.facade.cartItems$.pipe(tap(cartItems => this.initForms(cartItems)));
  overviewFormGroup: FormGroup;
  infoFormGroup: FormGroup;
  checkoutFormGroup: FormGroup;
  confirmationFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private facade: FeaturesFacadeService) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small]).subscribe(result => {
      if (result.matches) {
      } else {
      }
    });
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['']
    });
  }

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
}
