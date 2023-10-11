import {
  Component,
  HostListener,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { InfoSectionsService } from 'src/app/guide/services/info-sections.service';
import { Seccion } from 'src/app/guide/interfaces/sections.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JumbotromMenuComponent } from '../../components/jumbotrom-menu/jumbotrom-menu.component';

export interface Personaje {
  name: string;
  lastName: string;
}

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TitleCasePipe,
    ReactiveFormsModule,
    JsonPipe,
    JumbotromMenuComponent,
  ],
  templateUrl: './sections-user.component.html',
  styleUrls: ['./sections-user.component.scss'],
})
export class SectionsUserComponent implements OnInit {
  currentSectionIsAdd: boolean = false;
  public sectionsForm: FormGroup = this.formBuilder.group({
    id: [],
    titulo: [],
    titulo2: [],
    subtitulo: [],
    panel: [],
    seccion: [],
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

  get getKeysSeccion() {
    return Object.keys(this.sectionsForm.controls);
  }

  currentImageB64: string = '';
  async changeImage(
    event: Event,
    action: string,
    arrayGroup: FormArray,
    pos: number | undefined
  ) {
    let { files: filesImage } = event?.target as HTMLInputElement;
    this.currentImageB64 = await this.convertImgToBase64(<File>filesImage![0]);
    if (action == 'update') {
      this.updateFormGroupToArray(arrayGroup, <number>pos);
    }
  }

  convertImgToBase64(imagen: File): Promise<string> {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.readAsDataURL(imagen); /* convierte a url 64 */
      /* si se detecta que una url64 está activa automaticamente busca onLoad */
      fileReader.onload = (event) => {
        resolve(<string>event.target?.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  public addFormGroupToArray(currentArray: FormArray) {
    currentArray.push(
      this.formBuilder.group({
        subtitles: [
          this.formForArray.get('subtitles')?.value,
          Validators.required,
        ],
        imagesUrl: [this.currentImageB64 ?? ''],
      })
    );
    this.formForArray.reset();
  }

  public updateFormGroupToArray(currentArray: FormArray, pos: number) {
    currentArray?.controls[pos]
      .get('imagesUrl')
      ?.patchValue(this.currentImageB64);
    console.log(currentArray?.controls[pos].get('imagesUrl'));
  }

  public deleteFormGroupToArray(pos: number, currentArray: FormArray) {
    currentArray.removeAt(pos);
  }

  sendForm() {
    console.log(this.sectionsForm.value);
    if (this.sectionsForm.valid) {
      console.log('formValid');
      if (this.currentSectionIsAdd) {
      }
    } else {
      console.log('formInvalid');
    }
  }

  ngOnInit(): void {
    if (this.router.url.includes('add')) {
      this.currentSectionIsAdd = true;
      this.sectionsForm.reset();
    } else {
      this.currentSectionIsAdd = false;

      this.activatedRouter.params.subscribe(({ id }) => {});
    }
  }

  constructor(
    private guideService: InfoSectionsService,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
}
