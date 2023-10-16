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

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, JsonPipe, TitleCasePipe],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userEdit: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: [''],
    email: ['', Validators.required],
    direccion: [''],
    pais: [''],
    ciudad: [''],
    roles: [''],
    imagenUrl: [''],
    password: ['', Validators.required],
    isActive: ['', []],
  });

  get getControls(): string[] {
    return Object.keys(this.userEdit.controls);
  }

  currentSeccionIsEdit: boolean = false;
  ngOnInit(): void {
    this.userEdit.reset();
    if (this.router.url.includes('edit')) {
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
    if (this.currentSeccionIsEdit) {
      if (this.userEdit.valid) {
        console.log(this.currentChanges);
      } else {
        for (let item of Object.keys(this.userEdit.controls)) {
          console.log(item);
          console.log(this.userEdit.get(item)?.status);
          console.log(this.userEdit.get(item)?.errors);
          /*   console.log(this.userEdit.get(item)?.errors); */
        }
        console.log('form invalid');
      }
    } else {
      console.log('agregando');
    }
  }

  setValues(user: User) {
    this.currentChanges = {};
    this.userEdit.patchValue({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      direccion: user.direccion,
      pais: user.pais,
      ciudad: user.ciudad,
      roles: user.roles,
      imagenUrl: user.imagesUrl,
      password: user.password,
      isActive: user.isActive,
    });

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
    private router: Router
  ) {}
}
