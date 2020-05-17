import { AuthFacadeService } from './../../auth-facade.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/core.module';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { checkPasswords, requireLength, ConfirmPasswordErrorStateMatcher } from '../auth-validators';

@Component({
  selector: 'thng-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordResetComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  passwordResetForm: FormGroup;
  hide = true;
  matcher = new ConfirmPasswordErrorStateMatcher();
  constructor(private fb: FormBuilder, private facade: AuthFacadeService) {}

  ngOnInit(): void {
    this.initPasswordResetForm();
  }

  onSubmit(): void {
    const password = this.passwordResetForm.controls['password'].value;
    if (password) {
      this.facade.resetPassword(password);
    }
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
  }

  initPasswordResetForm(): void {
    this.passwordResetForm = this.fb.group(
      {
        password: this.fb.control('', [Validators.required, requireLength()]),
        confirmPassword: this.fb.control('', Validators.required)
      },
      { validators: checkPasswords() }
    );
  }
}
