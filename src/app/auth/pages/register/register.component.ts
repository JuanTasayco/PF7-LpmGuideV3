import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public formRegister: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    terms: false,
    passRepeat: ['', Validators.required],
  });

  @ViewChild('inputEmail') emailInput!: ElementRef<HTMLElement>;
  @ViewChild('inputPassword') passwordInput!: ElementRef<HTMLElement>;
  existError: any = false;

  getErrorsForm(name: string) {
    const control = this.formRegister.get(name);
    if (!control?.pristine || control?.touched) {
      const element =
        name === 'user'
          ? this.emailInput.nativeElement
          : this.passwordInput.nativeElement;

      this.existError = control?.touched && control?.errors;
      /* además de obtener el error estoy agregando estilos, en caso exista a los input en caso exista o no */
      this.existError
        ? this.applyStyleError(element)
        : this.applyStyleSuccess(element);
    } else {
      this.existError = false;
    }
    return this.existError;
  }

  getErrors(nameControl: string): string | null {
    if (!this.formRegister.get(nameControl)) return null;
    const errors = this.formRegister.get(nameControl)?.errors || {};
    for (let error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'Es necesario llenar este campo';
        case 'minlength':
          return 'Debe haber al menos 3 carácteners';
        case 'email':
          return 'El formato email no es el correcto';
        default:
          return '';
      }
    }
    return '';
  }

  applyStyleError(element: HTMLElement) {
    this.renderer.removeClass(element, 'successInput');
    this.renderer.removeClass(element, 'normalInput');
    this.renderer.addClass(element, 'errorInput');
  }

  applyStyleSuccess(element: HTMLElement) {
    this.renderer.removeClass(element, 'errorInput');
    this.renderer.removeClass(element, 'normalInput');
    this.renderer.addClass(element, 'successInput');
  }

  sendForm() {}
  constructor(private fb: FormBuilder, private renderer: Renderer2) {}
}
