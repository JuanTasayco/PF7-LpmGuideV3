import {
  Component,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('inputEmail') emailInput!: ElementRef<HTMLElement>;
  @ViewChild('inputPassword') passwordInput!: ElementRef<HTMLElement>;
  existError: any = false;

  public formLogin: FormGroup = this.fb.group({
    user: [
      '',
      [Validators.required, Validators.email, Validators.minLength(3)],
    ],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  getErrorsForm(name: string) {
    const control = this.formLogin.get(name);
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

  get getErrorNameEmail(): string {
    const error = this.formLogin.get('user')?.errors;
    if (error?.['required']) {
      return 'Es necesario especificar un correo';
    } else if (error?.['minlength']) {
      return 'El correo debe tener al menos 3 caracteres';
    } else if (error?.['email']) {
      return 'El correo no tiene el formato correcto';
    } else {
      return '';
    }
  }

  get getErrorNamePassword(): string {
    const error = this.formLogin.get('password')?.errors;
    if (error?.['required']) {
      return 'Es necesario especificar una contraseña';
    } else if (error?.['minlength']) {
      return 'Es necesario tener un mínimo de 3 caracteres';
    } else {
      return '';
    }
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

  /* enviar formulario */
  sendForm() {
    if (this.formLogin.valid) {
      this.formLogin.reset();
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  ngAfterViewInit(): void {}

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}
}
