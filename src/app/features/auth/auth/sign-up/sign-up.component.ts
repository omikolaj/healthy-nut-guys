import { AuthFacadeService } from './../../auth-facade.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ApplicationUser } from 'app/core/auth/application-user.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/core.module';
import { requireLength, checkPasswords, ConfirmPasswordErrorStateMatcher } from '../auth-validators';

@Component({
  selector: 'thng-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  signupForm: FormGroup;
  hide = true;
  matcher = new ConfirmPasswordErrorStateMatcher();

  constructor(private fb: FormBuilder, private facade: AuthFacadeService) {}

  ngOnInit(): void {
    this.initSignUpForm();
  }

  onSubmit(): void {
    const password = this.signupForm.controls['passwords'].get('password').value;
    const newUser = this.signupForm.value as ApplicationUser;
    if (newUser) {
      if (password) {
        newUser.password = password;
        this.facade.signUp(newUser);
      }
    }
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('email')) {
      return 'You must provide a valid email';
    }
  }

  private initSignUpForm(): void {
    this.signupForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      phoneNumber: this.fb.control(''),
      email: this.fb.control('', [Validators.required, Validators.email]),
      passwords: this.fb.group(
        {
          password: this.fb.control('', [Validators.required, requireLength()]),
          confirmPassword: this.fb.control('', Validators.required)
        },
        { validators: checkPasswords() }
      )
    });
  }
}
