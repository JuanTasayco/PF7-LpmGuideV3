import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { SectionsComponent } from '../../components/sections/sections.component';
import { PrincipalContentStaticComponent } from 'src/app/shared/principal-content-static/principal-content-static.component';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    SectionsComponent,
    PrincipalContentStaticComponent,
    FooterComponent,
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements AfterViewInit {
  constructor(private activatedRouter: ActivatedRoute) {}
  ngAfterViewInit(): void {}
}
