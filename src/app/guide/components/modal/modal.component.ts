import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flowbite } from '../../decorator/flowbite-decorator';
import { gsap } from 'gsap';

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

  @ViewChild('imageToScale') image!: ElementRef<HTMLElement>;
  private scaleNumber: number = 1;
  retireScale() {
    console.log('hello');
    this.scaleNumber = 1;
    gsap.set(this.image.nativeElement, {
      scaleX: 1,
      scaleY: 1,
    });
  }
  clickEventScaleReduce() {
    if (this.scaleNumber > 1) {
      this.scaleNumber -= 0.1;
    }
    this.updateScale();
  }

  clickEventScaleIncrease() {
    if (this.scaleNumber < 1.5) {
      this.scaleNumber += 0.1;
    }
    this.updateScale();
  }

  updateScale() {
    gsap.to(this.image.nativeElement, {
      scaleY: this.scaleNumber,
      scaleX: this.scaleNumber,
    });
  }
}
