import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormLogicService {
  validatePasswords(valuePassword1: string, valuePassword2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(valuePassword1)?.value;
      const pass2 = formGroup.get(valuePassword2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(valuePassword2)?.setErrors({ match: false });
        return {
          match: false,
        };
      }

      if (pass1.length !== 0) {
        formGroup.get(valuePassword2)?.setErrors(null);
      }

      return null;
    };
  }

  constructor() {}
}
