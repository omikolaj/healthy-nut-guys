import { ValidatorFn, FormGroup, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class ConfirmPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty && control.touched);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.touched);
    return invalidCtrl || invalidParent;
  }
}

export function checkPasswords(): ValidatorFn {
  return (group: FormGroup): { [key: string]: any } | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };
}

export function requireLength(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const pass: string = control.value;
    return pass.length > 7 ? null : { tooShort: true };
  };
}
