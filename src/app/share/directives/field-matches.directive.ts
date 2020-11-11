import { AbstractControl, ValidationErrors, Validator, NgModel, NG_VALIDATORS, FormGroup } from '@angular/forms';
import { Directive, Input } from '@angular/core';



@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[fieldmatches]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FieldMatchesDirective, multi: true }
  ]
})
export class FieldMatchesDirective implements Validator {

  // tslint:disable-next-line:no-input-rename
  @Input('fieldmatches')
  fieldmatches: NgModel;

  constructor() { }

  public validate(formGroup: FormGroup): ValidationErrors | null {
    if (!this.fieldmatches) {
      return null;
    }
    const pwd = this.fieldmatches[0];
    const confirm = this.fieldmatches[1];
    if (!formGroup.controls[ confirm ]) {
      return null;
    }
    return this.matchPassword(pwd, confirm)(formGroup);
  }

  public registerOnValidatorChange(fn: () => void): void {

  }

  private matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}
