import { CartFacadeService } from './../cart-facade.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/core.module';
import { map, tap } from 'rxjs/operators';
import { CartItem } from 'app/core/models/cart-item.model';
import { CartService } from '../cart.service';
import { FormGroup, FormBuilder, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { CartItemQuantiy } from 'app/core/models/cart-tem-quantity.model';

@Component({
  selector: 'thng-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  quantityFormGroup: FormGroup;
  // return only single matches of the cart item
  cartItems$ = this.facade.cartItems$.pipe(tap(cartItems => (this.quantityFormGroup = this.initItemsQuantityForm(cartItems.items))));

  constructor(private router: Router, private route: ActivatedRoute, private facade: CartFacadeService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onContinueShopping(): void {
    this.router.navigate(['products']);
  }

  onRemoveCartItem(cartItem: CartItem): void {
    this.facade.removeCartItem(cartItem);
  }

  onUpdateCart(): void {
    const cartItemsQuantities: CartItemQuantiy[] = this.quantityFormGroup.value;
    this.facade.updateCartItemsQuantities(cartItemsQuantities['quantities']);
  }

  onCheckOut(): void {
    this.router.navigate(['checkout']);
  }

  private initItemsQuantityForm(cartItems: CartItem[]): FormGroup {
    return this.fb.group({
      quantities: this.fb.array(cartItems.map(c => this.initCartItemQuantityForm(c)))
    });
  }
  private initCartItemQuantityForm(cartItem: CartItem): FormGroup {
    return this.fb.group({
      quantity: this.fb.control(cartItem.quantity, this.nonZeroRequirement()),
      id: cartItem.productId,
      cartItemId: cartItem.id
    });
  }

  private nonZeroRequirement(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const quantity = parseInt(control.value);
      // if(quantity < 1) {
      //   control['parent']['parent']
      // }
      return quantity < 1 ? { forbidden: { value: control.value } } : null;
    };
  }
}
