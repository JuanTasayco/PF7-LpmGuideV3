import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor, TitleCasePipe } from '@angular/common';
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

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    JsonPipe,
    TitleCasePipe,
    ModalAlertComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  currentSeccionIsEdit: boolean = false;
  showModal: boolean = false;
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

  currentChanges: any = {};
  sendUser() {
    /* editando */
    if (this.currentSeccionIsEdit) {
      if (this.userEdit.valid) {
        if (Object.getOwnPropertyNames(this.currentChanges).length > 0) {
          const id = this.userEdit.get('id')?.value;
          this.adminService
            .updateUser(id, this.currentChanges)
            .subscribe((response) => {
              if (response) this.handleModal('Editado correctamente');
              else this.handleModal('No pudimos actualizar el usuario');
              setTimeout(() => {
                window.location.reload();
              }, 1200);
            });
        } else {
          this.handleModal('No hubo cambios en el usuario.');
        }
      } else {
        this.handleModal('Formulario no es válido por favor revisar.');
      }
    } else {
      /* agregando */
      if (this.userEdit.valid) {
        const { isActive, ...newUser } = this.userEdit.value;
        this.adminService.createUser(newUser).subscribe((responseObject) => {
          if (typeof responseObject == 'string') {
            this.handleModal(responseObject);
          } else {
            this.handleModal('Agregado Correctamente');
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
        this.handleModal('Formulario no es válido por favor revisar.');
      }
    }
  }

  handleModal(msg: string) {
    this.showModal = true;
    this.currentMsgForModal = msg;
  }

  setValues(user: User) {
    this.currentChanges = {};
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

    for (let controlName of Object.keys(this.userEdit.controls)) {
      this.userEdit.get(controlName)?.valueChanges.subscribe((value) => {
        this.currentChanges[controlName] = value;
      });
    }
  }

  closeModal(event: boolean) {
    this.showModal = event;
  }
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}
}
