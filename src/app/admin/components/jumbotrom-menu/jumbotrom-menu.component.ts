import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jumbotrom-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jumbotrom-menu.component.html',
  styleUrls: ['./jumbotrom-menu.component.scss'],
})
export class JumbotromMenuComponent {
  @Input() colorLabels: string = 'bg-pink-800';
  @Input() typeSeccionName: string = 'Editar';
  @Input() seccionName : string = "Seccion"
  @Input() textoDescription: string =
    'Aquí podrás editar partes fundamentales del concepto';
}
