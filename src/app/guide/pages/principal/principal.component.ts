import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { SectionsComponent } from '../../components/sections/sections.component';
import { PrincipalContentStaticComponent } from 'src/app/shared/principal-content-static/principal-content-static.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [SectionsComponent, PrincipalContentStaticComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent {}
