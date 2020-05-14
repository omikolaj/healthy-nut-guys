import { AuthFacadeService } from './../../auth-facade.service';
import { Store } from '@ngxs/store';
import { ApplicationUser } from './../../../../core/auth/application-user.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as Auth from '../../../../core/auth/auth.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'thng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private facade: AuthFacadeService) {}

  ngOnInit(): void {
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
