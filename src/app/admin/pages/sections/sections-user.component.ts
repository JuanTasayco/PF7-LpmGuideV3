import {
  AfterViewChecked,
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
import { switchMap } from 'rxjs';

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
  }

  public deleteFormGroupToArray(pos: number, currentArray: FormArray) {
    currentArray.removeAt(pos);
  }

  sendForm() {
    if (this.sectionsForm.valid) {
      console.log('formValid');
      if (!this.currentSectionIsAdd) {
        console.log(this.formObjectChanges);
      }
    } else {
      console.log('formInvalid');
    }
  }

  ngOnInit(): void {
    if (this.router.url.includes('add')) {
      this.currentSectionIsAdd = true;
    } else {
      this.currentSectionIsAdd = false;

      /* resolver información de sección */
      /* cambia la url, reseteas form y borras valores del array */
      this.activatedRouter.params.subscribe(() => {
        this.deleteValuesForm();
        this.sectionsForm.reset();
      });

      this.activatedRouter.params
        .pipe(
          switchMap(({ id: title }) =>
            this.guideService.getOnlyOneDataByTitle(title)
          )
        )
        .subscribe((section) => {
          console.log('holitas');
          if (typeof section == 'boolean') {
            this.router.navigate(['/admin/sections/add']);
          } else {
            this.setValuesToForm(section);
          }
        });
    }
  }

  /* asignar valores que vienen del back en cada sección (solo en editar)*/
  setValuesToForm(section: Seccion) {
    this.sectionsForm.patchValue({
      id: section.id,
      panel: section.panel,
      seccion: section.seccion,
      subtitulo: section.subtitulo,
      titulo: section.titulo,
      titulo2: section.titulo2,
    });

    if (section.contenido && section.contenido.length > 0) {
      section.contenido?.forEach((values) => {
        this.contenidoArray.push(
          this.formBuilder.group({
            id: [values.id],
            subtitles: [values.subtitles],
            imagesUrl: [values.imagesUrl],
            publicIdImage: [values.publicIdImage],
          })
        );
      });
    }

    if (section.ingreso && section.ingreso.length > 0) {
      section.ingreso?.forEach((values) => {
        this.ingresoArray.push(
          this.formBuilder.group({
            id: [values.id],
            subtitles: [values.subtitles],
            imagesUrl: [values.imagesUrl],
            publicIdImage: [values.publicIdImage],
          })
        );
      });
    }
    this.formObjectChanges = {};
    this.getValuesChangesForm();
  }

  /* borrar cajas del form al cambiar de url de lo contrario se acumulan (solo para editar)*/
  deleteValuesForm() {
    while (this.ingresoArray.length > 0) {
      this.ingresoArray.removeAt(0);
    }

    while (this.contenidoArray.length > 0) {
      this.contenidoArray.removeAt(0);
    }
  }

  formObjectChanges: { [key: string]: any } = {};

  getValuesChangesForm() {
    this.getKeysSeccion.forEach((keyForm) => {
      this.sectionsForm.get(keyForm)?.valueChanges.subscribe((valueChange) => {
        this.formObjectChanges[keyForm] = valueChange;
      });
    });
  }

  constructor(
    private guideService: InfoSectionsService,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
}
