import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MenuSectionsComponent } from '../../components/menu-sections/menu-sections.component';
import { PrincipalContentStaticComponent } from 'src/app/shared/principal-content-static/principal-content-static.component';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [
    MenuSectionsComponent,
    PrincipalContentStaticComponent,
    FooterComponent,
  ],
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
})
export class ContentsComponent implements AfterViewInit, OnInit {
  ngAfterViewInit(): void {}

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {}
}
