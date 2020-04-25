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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  onContinueShopping(): void {}

  onUpdateCart(): void {}

  onCheckOut(): void {}
}
