import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { Modal, ModalOptions } from 'flowbite';
import { ModalChangesService } from '../modal-changes.service';
import { Flowbite } from 'src/app/guide/decorator/flowbite-decorator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-alert',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent implements AfterViewInit, OnInit {
  /*   @Input() msgForModal: string = ''; */
  @ViewChild('modalObject') modalComponent!: ElementRef<HTMLElement>;
  modalService = inject(ModalChangesService);
  modal!: Modal;
  addBgToModal: boolean = false;
  /*  bg-gray-900 bg-opacity-50 fixed inset-0 */

  @Input() redirectPage: boolean = false;
  @Input() linkNameRedirect: string = '';
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const options: ModalOptions = {
      /* bottom-right */
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'z-10',
      closable: true,
      onHide: () => {
        this.addBgToModal = false;

        /* redirect en true y además linkRedirect tiene que tener una ruta de string no venir vacío */
        if (this.redirectPage) {
          this.linkNameRedirect.length == 0
            ? window.location.reload()
            : this.router.navigate([this.linkNameRedirect]);
        }
      },
      onShow: () => {
        this.addBgToModal = true;
      },
      onToggle: () => {},
    };

    this.modal = new Modal(this.modalComponent.nativeElement, options);

    /* recibir mensaje que tendrá el modal */
    this.modalService.getOpenModalEvent.subscribe((message) => {
      if (message) this.openModal(message);
    });
  }

  currentMessageForModal = signal<string>('');
  openModal(message: string) {
    this.currentMessageForModal.update(() => message);
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }

  constructor(private router: Router) {}
}
