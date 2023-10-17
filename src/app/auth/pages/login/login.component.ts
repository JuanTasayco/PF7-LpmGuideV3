import {
  Component,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ModalAlertComponent } from '../../../shared/modal-alert/modal-alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    RouterModule,
    ModalAlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnInit {
  @ViewChild('inputEmail') emailInput!: ElementRef<HTMLElement>;
  @ViewChild('inputPassword') passwordInput!: ElementRef<HTMLElement>;
  existError: boolean = false;
  showModal: boolean = false;
  public formLogin: FormGroup = this.fb.group({
    user: ['juantasayco@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(3)]],
    terms: [true, []],
  });

  getErrorsForm(name: string) {
    const control = this.formLogin.get(name);
    if (!control?.pristine || control?.touched) {
      const element =
        name === 'user'
          ? this.emailInput.nativeElement
          : this.passwordInput.nativeElement;

      this.existError = <boolean>(control?.touched && control?.errors);
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
    if (!this.formLogin.get(nameControl)) return null;
    const errors = this.formLogin.get(nameControl)?.errors || {};
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

  /* enviar formulario */
  sendForm() {
    if (this.formLogin.valid && this.formLogin.get('terms')?.value) {
      this.formLogin.reset();
      this.router.navigate(['admin/sections/add']);
    } else {
      this.formLogin.markAllAsTouched();
      this.showModal = true;
    }
  }

  ngAfterViewInit(): void {}

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private router: Router
  ) {}
  ngOnInit(): void {}

  getEventCloseModal(eventClose: boolean) {
    this.showModal = eventClose;
  }
}
