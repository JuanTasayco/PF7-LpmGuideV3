import { Component, OnInit } from '@angular/core';
import { JsonPipe, NgFor, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, JsonPipe, TitleCasePipe],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userEdit: FormGroup = this.formBuilder.group({
    nombre: ['Juan '],
    apellido: ['Tasayco'],
    email: ['juantasayco266@gmail.com'],
    direccion: ['Calle Daniel Cornejo 153 int 4'],
    pais: ['Perú'],
    ciudad: ['Lima'],
    roles: ['Administrador'],
    imagenUrl: ['imagenurl.com'],
    password: ['password'],
    isActive: [false],
  });

  get getControls(): string[] {
    return Object.keys(this.userEdit.controls);
  }

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.getControls;
  }
}
