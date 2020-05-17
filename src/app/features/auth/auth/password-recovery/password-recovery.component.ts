import { AuthFacadeService } from '../../auth-facade.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'app/core/core.module';

@Component({
  selector: 'thng-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordRecoveryComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  email: FormControl = this.fb.control('', [Validators.required, Validators.email]);

  constructor(private fb: FormBuilder, private facade: AuthFacadeService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const email = this.email.value;
    if (email) {
      this.facade.recoverPassword(email);
    }
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must provide a value';
    }
    if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }
}
