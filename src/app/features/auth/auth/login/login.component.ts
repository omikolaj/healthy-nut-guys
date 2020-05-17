import { Router } from '@angular/router';
import { AuthFacadeService } from './../../auth-facade.service';
import { Store } from '@ngxs/store';
import { ApplicationUser } from './../../../../core/auth/application-user.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as Auth from '../../../../core/auth/auth.actions';
import { tap } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/core.module';

@Component({
  selector: 'thng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private facade: AuthFacadeService, private router: Router) {}

  ngOnInit(): void {
    console.log('router', this.router.url);
    this.initLoginForm();
  }

  onSubmit(): void {
    const user = this.loginForm.value as ApplicationUser;
    if (user) {
      this.facade.login(user);
    }
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'You must provide a value';
    }
    if (control.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
  }
}
