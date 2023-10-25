import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';
import { MenuSectionsComponent } from '../../components/menu-sections/menu-sections.component';
import { PrincipalContentStaticComponent } from 'src/app/shared/principal-content-static/principal-content-static.component';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { AllSectionsComponent } from '../../components/all-sections/all-sections.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    MenuSectionsComponent,
    PrincipalContentStaticComponent,
    FooterComponent,
    AllSectionsComponent,
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements AfterViewInit {
  constructor(private activatedRouter: ActivatedRoute) {}
  ngAfterViewInit(): void {}
}
