import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockupMobileComponent } from '../mockup-mobile/mockup-mobile.component';

@Component({
  selector: 'app-principal-content-static',
  standalone: true,
  imports: [RouterModule, MockupMobileComponent],
  templateUrl: './principal-content-static.component.html',
  styleUrls: ['./principal-content-static.component.scss']
})
export class PrincipalContentStaticComponent {

}
