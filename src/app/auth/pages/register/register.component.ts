import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormLogicService } from '../../services/form-logic.service';
import { ModalAlertComponent } from '../../../shared/modal-alert/modal-alert.component';
import { AuthService } from '../../services/auth.service';
import { ModalChangesService } from 'src/app/shared/modal-changes.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterModule, ModalAlertComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  /* lógica para el modal component, para redireccionar al cerrar modal */
  redirectPageWhenHideModal: boolean = false;
  /* no colocar nada en el string, se usa para validación si es vacía. */
  linkRedirectPageWhenHideModal: string = '';

  public formRegister: FormGroup = this.fb.group(
    {
      email: [
        'juantasayco269@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['123456', [Validators.required, Validators.minLength(3)]],
      terms: false,
      passRepeat: ['', [Validators.required]],
    },
    {
      validators: [
        this.formLogicService.validatePasswords('password', 'passRepeat'),
      ],
    }
  );

  @ViewChild('inputEmail') emailInput!: ElementRef<HTMLElement>;
  @ViewChild('inputPassword') passwordInput!: ElementRef<HTMLElement>;
  @ViewChild('inputpassRepeat') passRepeatInput!: ElementRef<HTMLElement>;
  existError: any = false;

  getErrorsForm(name: string) {
    const control = this.formRegister.get(name);
    if (!control?.pristine || control?.touched) {
      const ELEMENTS_DOM: any = {
        email: this.emailInput.nativeElement,
        password: this.passwordInput.nativeElement,
        passRepeat: this.passRepeatInput.nativeElement,
      };

      const element: HTMLElement = ELEMENTS_DOM[name];
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

        case 'match':
          return 'Las contraseñas no son iguales';
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

  sendForm() {
    if (this.formRegister.valid && this.formRegister.get('terms')?.value) {
      const { password, email } = this.formRegister.value;

      this.authService
        .registerUser({
          email,
          password,
        })
        .subscribe((response: boolean) => {
          if (response) {
            this.redirectPageWhenHideModal = true;
            this.linkRedirectPageWhenHideModal = '/auth/login';
            this.modalService.setEventForOpenModal = 'Registrado Correctamente';
          } else {
            this.modalService.setEventForOpenModal =
              this.authService.currentErrorMsg();
          }
        });
    } else {
      this.modalService.setEventForOpenModal =
        'Existen errores en el formulario';
      this.formRegister.markAllAsTouched();
    }
  }

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private formLogicService: FormLogicService,
    private authService: AuthService,
    private modalService: ModalChangesService
  ) {}
}
