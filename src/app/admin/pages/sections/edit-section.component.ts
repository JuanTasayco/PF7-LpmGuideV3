import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
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
import { ModalComponent } from 'src/app/guide/components/modal-image/modal.component';
import { ImgPipe } from 'src/app/guide/pipes/img.pipe';
import { AdminService } from '../../services/admin.service';
import { ModalAlertComponent } from 'src/app/shared/modal-alert/modal-alert.component';
import { ModalChangesService } from 'src/app/shared/modal-changes.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

export interface Personaje {
  name: string;
  lastName: string;
}

@Component({
  selector: 'app-edit-section',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TitleCasePipe,
    ReactiveFormsModule,
    JsonPipe,
    JumbotromMenuComponent,
    ModalComponent,
    ImgPipe,
    ModalAlertComponent,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
  ],
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss'],
})
export class EditSectionComponent implements OnInit {
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
      if (!this.currentSectionIsAdd) {
        /* esditando */
        if (Object.getOwnPropertyNames(this.currentChanges).length > 0) {
          const id = this.sectionsForm.get('id')?.value;
          if (this.currentChanges['contenido']) {
            this.deleteIdForImg(this.currentChanges['contenido']);
          }
          if (this.currentChanges['ingreso']) {
            this.deleteIdForImg(this.currentChanges['ingreso']);
          }

          this.adminService
            .updateSection(id, this.currentChanges)
            .subscribe((resp: boolean) => {
              if (!resp) {
                this.modalService.setEventForOpenModal =
                  this.adminService.currentError();
              } else {
                this.modalService.setEventForOpenModal =
                  'Actualizado correctamente';
              }
            });
        } else {
          this.modalService.setEventForOpenModal =
            'No hubo cambios en la sección';
        }
      } else {
        /* agregando ando */
        const { id, ...newSection } = this.sectionsForm?.value;
        this.adminService
          .createSection(newSection)
          .subscribe((resp: boolean) => {
            if (!resp) {
              this.modalService.setEventForOpenModal =
                this.adminService.currentError();
            } else {
              this.modalService.setEventForOpenModal = 'Agregado correctamente';
            }
          });
      }
    } else {
      this.modalService.setEventForOpenModal =
        'El formulario no es válido, por favor revisa con detenimiento si está completo';
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
    this.currentChanges = {};
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

  currentChanges: { [key: string]: any } = {};
  getValuesChangesForm() {
    this.getKeysSeccion.forEach((keyForm) => {
      this.sectionsForm.get(keyForm)?.valueChanges.subscribe((valueChange) => {
        this.currentChanges[keyForm] = valueChange;
      });
    });
  }

  /* así pide al back, sucede que al enviar imagenes a editar, envía también el id */
  deleteIdForImg(arreglo: any[]) {
    return arreglo.map((objeto) => {
      delete objeto.id;
      return objeto;
    });
  }

  drop(event: CdkDragDrop<any>): void {
    /* animación para que se quede donde lo dejo al arrastrar */
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.ingresoArray.updateValueAndValidity();
    this.cdr.detectChanges();

    console.log(this.ingresoArray.value);
    console.log(this.currentChanges);
  }

  constructor(
    private guideService: InfoSectionsService,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private modalService: ModalChangesService,
    private cdr: ChangeDetectorRef
  ) {}
}
