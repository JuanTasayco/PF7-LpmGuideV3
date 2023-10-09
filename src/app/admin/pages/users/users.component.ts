import { Component } from '@angular/core';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [EditUserComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {}
