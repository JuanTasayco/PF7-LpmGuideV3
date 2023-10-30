import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgClass, NgFor, TitleCasePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { User } from '../../interfaces/admin.interfaces';
import { ModalAlertComponent } from 'src/app/shared/modal-alert/modal-alert.component';
import { ModalChangesService } from 'src/app/shared/modal-changes.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    JsonPipe,
    TitleCasePipe,
    ModalAlertComponent,
    NgClass,
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  /* lógica para el modal component, para redireccionar al cerrar modal */
  redirectPageWhenHideModal: boolean = false;
  linkRedirectPageWhenHideModal: string = '';

  currentSeccionIsEdit: boolean = false;
  currentMsgForModal: string = '';

  userEdit: FormGroup = this.formBuilder.group({
    id: [],
    nombre: ['', Validators.required],
    apellido: [''],
    email: ['', Validators.required],
    direccion: [''],
    pais: [''],
    ciudad: [''],
    roles: [''],
    imagenUrl: [''],
    password: ['', [this.currentSeccionIsEdit ? '' : Validators.required]],
    isActive: [''],
  });

  get getControls(): string[] {
    const controlNames = Object.getOwnPropertyNames(this.userEdit.controls);
    const listaExclusion = ['roles', 'isActive'];
    return controlNames.filter((name) => !listaExclusion.includes(name));
  }

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.userEdit.reset();
      this.currentSeccionIsEdit = true;
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.adminService.getUserById(id)))
        .subscribe((user: User) => {
          this.setValues(user);
        });
    } else {
      /* nombre email password isActive */
      this.currentSeccionIsEdit = false;
    }
  }

  /* algunas propiedades del userEditForm, puede ir solo nombre o roles, o etc */
  currentChanges: any = {};
  sendUser() {
    /* editando */
    if (this.currentSeccionIsEdit) {
      if (this.userEdit.valid) {
        if (Object.getOwnPropertyNames(this.currentChanges).length > 0) {
          const id = this.userEdit.get('id')?.value;
          this.adminService
            .updateUser(id, this.currentChanges)
            .subscribe((resp: boolean) => {
              if (resp) {
                this.modalService.setEventForOpenModal =
                  'Editado Correctamente.';
                this.redirectPageWhenHideModal = true;
              } else {
                this.modalService.setEventForOpenModal =
                  this.adminService.currentError();
              }
            });

          /* si no hay currentChanges ( propiedades que cambian) */
        } else {
          this.modalService.setEventForOpenModal =
            'No hubo cambios en el usuario.';
        }
      } else {
        /* si el formulario no es válido */
        this.modalService.setEventForOpenModal =
          'Formulario no es válido por favor revisar.';
      }
    } else {
      /* agregando */
      if (this.userEdit.valid) {
        const { id, ...newUser } = this.userEdit.value;
        this.adminService.createUser(newUser).subscribe((resp: boolean) => {
          if (!resp) {
            this.modalService.setEventForOpenModal =
              this.adminService.currentError();
          } else {
            this.modalService.setEventForOpenModal = 'Agregado Correctamente';
            this.redirectPageWhenHideModal = true;
            this.linkRedirectPageWhenHideModal = '/admin/users';
            this.userEdit.reset({
              apellido: '',
              direccion: '',
              pais: '',
              ciudad: '',
              imagenUrl: '',
              isActive: '',
            });
          }
        });
      } else {
        this.modalService.setEventForOpenModal =
          'Formulario no es válido por favor revisar.';
      }
    }
  }

  deleteUser(id: string) {
    this.adminService.deleteUser(id).subscribe((response: boolean) => {
      if (response) {
        this.redirectPageWhenHideModal = true;
        this.linkRedirectPageWhenHideModal = '/admin/users';
        this.modalService.setEventForOpenModal = 'Eliminado Correctamente';
      } else {
        this.modalService.setEventForOpenModal =
          'No se pudo eliminar el usuario';
      }
    });
  }

  setValues(user: User) {
    this.userEdit.patchValue({
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      direccion: user.direccion,
      pais: user.pais,
      ciudad: user.ciudad,
      roles: user.roles,
      imagenUrl: user.imagenUrl,
      password: user.password,
      isActive: user.isActive,
    });

    this.currentChanges = {};
    for (let controlName of Object.keys(this.userEdit.controls)) {
      this.userEdit.get(controlName)?.valueChanges.subscribe((value) => {
        this.currentChanges[controlName] = value;
      });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private modalService: ModalChangesService
  ) {}
}
