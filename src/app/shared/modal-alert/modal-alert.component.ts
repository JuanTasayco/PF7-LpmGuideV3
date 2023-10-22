import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { NgIf } from '@angular/common';

import { Modal, ModalOptions } from 'flowbite';
import { ModalChangesService } from '../modal-changes.service';
@Component({
  selector: 'app-modal-alert',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent implements AfterViewInit, OnInit {
  /*   @Input() msgForModal: string = ''; */
  @ViewChild('modalObject') modalComponent!: ElementRef<HTMLElement>;
  modalService = inject(ModalChangesService);
  modal!: Modal;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const options: ModalOptions = {
      /* bottom-right */
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40',
      closable: true,
      onHide: () => {},
      onShow: () => {},
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
}
