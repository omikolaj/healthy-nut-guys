import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'thng-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  isLinear = true;
  overviewFormGroup: FormGroup;
  infoFormGroup: FormGroup;
  checkoutFormGroup: FormGroup;
  confirmationFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder
  ) {}

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
    this.initForms();
  }

  private initForms(): void {
    this.initOverviewForm();
    this.initInfoForm();
    this.initCheckoutForm();
    this.initConfirmationForm();
  }

  private initOverviewForm(): void {
    // have to be created based on what has been added to the cart
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
