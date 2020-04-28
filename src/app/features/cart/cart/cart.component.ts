import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/core.module';

@Component({
  selector: 'thng-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onContinueShopping(): void {}

  onUpdateCart(): void {}

  onCheckOut(): void {
    console.log('this.route', this.route);
    this.router.navigate(['checkout'], { relativeTo: this.route.parent });
  }
}
