import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ConfirmPasswordErrorStateMatcher } from './error-state-matcher';

@Component({
  selector: 'thng-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  hide = true;
  matcher = new ConfirmPasswordErrorStateMatcher();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initSignUpForm();
  }

  onSubmit(): void {}

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
          password: this.fb.control('', [Validators.required, this.requireLength()]),
          confirmPassword: this.fb.control('', Validators.required)
        },
        { validators: this.checkPasswords() }
      )
    });
  }

  private checkPasswords(): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } | null => {
      let pass = group.get('password').value;
      let confirmPass = group.get('confirmPassword').value;
      return pass === confirmPass ? null : { notSame: true };
    };
  }

  private requireLength(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const pass: string = control.value;
      return pass.length > 7 ? null : { tooShort: true };
    };
  }
}
