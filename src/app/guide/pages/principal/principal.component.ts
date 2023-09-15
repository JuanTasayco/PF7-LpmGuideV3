import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { SectionsComponent } from '../../components/sections/sections.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [SectionsComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent {}
