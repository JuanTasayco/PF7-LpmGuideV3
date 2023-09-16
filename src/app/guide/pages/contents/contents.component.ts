import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsComponent } from '../../components/sections/sections.component';
import { PrincipalComponent } from '../principal/principal.component';
import { PrincipalContentStaticComponent } from 'src/app/shared/principal-content-static/principal-content-static.component';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [SectionsComponent,PrincipalContentStaticComponent],
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
})
export class ContentsComponent {}
