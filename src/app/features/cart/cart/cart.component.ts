import { CartFacadeService } from './../cart-facade.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/core.module';
import { map, tap } from 'rxjs/operators';
import { CartItem } from 'app/core/models/cart-item.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'thng-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  // return only single matches of the cart item
  cartItems$ = this.facade.cartItems$.pipe(map(cartItems => this.cartService.getDistinctCartItems(cartItems)));

  constructor(private router: Router, private route: ActivatedRoute, private facade: CartFacadeService, private cartService: CartService) {}

  ngOnInit(): void {}

  onContinueShopping(): void {}

  onUpdateCart(): void {}

  onCheckOut(): void {
    this.router.navigate(['checkout']);
  }
}
