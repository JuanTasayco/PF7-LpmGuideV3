import { Component, OnInit, computed, signal } from '@angular/core';
import { JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from 'src/app/guide/services/info-sections.service';
import { Seccion } from 'src/app/guide/interfaces/sections.interfaces';
import { ActivatedRoute } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export interface Personaje {
  name: string;
  lastName: string;
}

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe, ReactiveFormsModule, JsonPipe],
  templateUrl: './sections-user.component.html',
  styleUrls: ['./sections-user.component.scss'],
})
export class SectionsUserComponent implements OnInit {
  public seccion = signal<Seccion>({
    id: '',
    titulo: '',
    titulo2: '',
    subtitulo: '',
    panel: '',
    seccion: '',
    ingreso: [],
    contenido: [],
  });

  public sectionsForm: FormGroup = this.formBuilder.group({
    id: [''],
    titulo: [''],
    titulo2: [''],
    subtitulo: [''],
    panel: [''],
    seccion: [''],
    ingreso: this.formBuilder.array([], Validators.required),
    contenido: this.formBuilder.array([], Validators.required),
  });

  formForArray: FormGroup = this.formBuilder.group({
    subtitles: ['', Validators.required],
    imagesUrl: [''],
  });

  get ingresoArray() {
    return this.sectionsForm.get('ingreso') as FormArray;
  }

  get contenidoArray() {
    return this.sectionsForm.get('contenido') as FormArray;
  }

  public addFormGroupToArray(currentArray: FormArray) {
    currentArray.push(
      this.formBuilder.group({
        subtitles: [this.formForArray.get('subtitles')?.value ?? ''],
        imagesUrl: [this.formForArray.get('imagesUrl')?.value ?? ''],
      })
    );
    this.formForArray.reset();
  }

  public deleteFormGroupToArray(pos: number, currentArray: FormArray) {
    currentArray.removeAt(pos);
  }

  sendForm() {
    console.log(this.sectionsForm.value);
  }

  get getKeysSeccion() {
    return Object.keys(this.seccion());
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({ id }) => {
      if (id) {
        console.log('estoy editando');
      } else {
        console.log('estoy agregando');
      }
    });
  }

  constructor(
    private guideService: InfoSectionsService,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
}
