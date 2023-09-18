import { AfterViewInit, Component } from '@angular/core';
import { SectionsComponent } from '../../components/sections/sections.component';
import { PrincipalContentStaticComponent } from 'src/app/shared/principal-content-static/principal-content-static.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [SectionsComponent, PrincipalContentStaticComponent],
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
})
export class ContentsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.activatedRoute.fragment.subscribe((fragm) => {
      if (fragm) {
        const element = document.getElementById('mi-section');
        if (element) {
          element.scrollIntoView({ block: 'start' });
        }
      }
    });
  }

  constructor(private activatedRoute: ActivatedRoute) {}
}
