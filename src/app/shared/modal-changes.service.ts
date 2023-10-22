import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalChangesService {
  constructor() {}

  modalOpen = new Subject<string>();

  set setEventForOpenModal(messageEvent: string) {
    this.modalOpen.next(messageEvent);
  }

  get getOpenModalEvent() {
    return this.modalOpen as Observable<string>;
  }
}
