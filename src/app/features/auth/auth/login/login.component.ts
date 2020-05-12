import { Store } from '@ngxs/store';
import { ApplicationUser } from './../../../../core/auth/application-user.model';
import { AuthService } from './../../../../core/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as Auth from '../../../../core/auth/auth.actions';

@Component({
  selector: 'thng-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  onSubmit(): void {
    const user = this.loginForm.value as ApplicationUser;
    if (user) {
      this.store.dispatch(new Auth.Login(user));
    }
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    });
  }
}
