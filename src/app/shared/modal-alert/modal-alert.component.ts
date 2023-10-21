import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { gsap } from 'gsap';
import { Flowbite } from 'src/app/guide/decorator/flowbite-decorator';
@Component({
  selector: 'app-modal-alert',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
@Flowbite()
export class ModalAlertComponent implements OnInit, OnChanges {
  @Input() showButtonsActivate: boolean = false;
  textYesButton: string = 'Ok';
  textNoButton: string = 'Salir';
  @Input() textDescriptionModal: string = '';
  @Input('showModalComponent') showModal: boolean = false;
  @Output('closeModalComponent') closeModal: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  /* Alert--show  */
  @ViewChild('modalContainer') modalContainer!: ElementRef<HTMLElement>;
  @ViewChild('modalItem') modalItem!: ElementRef<HTMLElement>;

  closeButton() {
    gsap.to(this.modalItem.nativeElement, {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      onComplete: () => {
        this.modalContainer.nativeElement.classList.remove('Alert--show');
        this.showModal = false;
        this.closeModal.emit(this.showModal);
      },
    });
  }

  openButton() {
    gsap.to(this.modalItem.nativeElement, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      onComplete: () => {
        this.modalContainer.nativeElement.classList.add('Alert--show');
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showModal'].currentValue) {
      this.openButton();
    }
  }

  constructor() {}
  ngOnInit(): void {}
}
