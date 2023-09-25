import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flowbite } from '../../decorator/flowbite-decorator';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
@Flowbite()
export class ModalComponent {
  @Input('modelTargetComponent') modelTarget: string = '';
  @Input('linkImageComponent') linkImage: string = '';
  @Input('numberImageComponent') numberImage: number = 0;
}
