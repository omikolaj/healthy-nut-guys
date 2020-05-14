import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'thng-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initSignUpForm();
  }

  onSubmit(): void {}

  private initSignUpForm(): void {
    this.signupForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      phoneNumber: this.fb.control(''),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
      confirmPassword: this.fb.control('', Validators.required)
    });
  }
}
