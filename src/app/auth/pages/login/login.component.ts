import {
  Component,
  OnInit,
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
      'usuario1',
      [Validators.required, Validators.email, Validators.minLength(3)],
    ],
    password: ['as', [Validators.required, Validators.minLength(3)]],
  });

  getErrorsForm(name: string) {
    const control = this.formLogin.get(name);
    if (!control?.pristine) {
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

  sendForm() {
    console.log('touched');
    if (!this.formLogin.errors) {
      console.log('enviar formulario');
    } else {
      this.formLogin.markAllAsTouched();
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

  ngAfterViewInit(): void {
    console.log(this.emailInput.nativeElement);
    console.log(this.passwordInput.nativeElement);

    console.log('pristine' + this.formLogin.get('user')?.pristine);
  }

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}
}
