import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarAdminComponent } from 'src/app/shared/nav-bar-admin/nav-bar-admin.component';
import { SideNavComponent } from 'src/app/shared/side-nav/side-nav.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [RouterModule, SideNavComponent, NavBarAdminComponent],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent {}
