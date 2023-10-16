import { Component, OnInit, signal, computed } from '@angular/core';
import { CardUserComponent } from '../../components/card-user/card-user.component';
import { AdminService } from '../../services/admin.service';
import { User } from '../../interfaces/admin.interfaces';
import { JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CardUserComponent, JsonPipe, NgFor, NgIf],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  private users = signal<User[]>([
    {
      id: '',
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      pais: '',
      ciudad: '',
      roles: '',
      imagesUrl: '',
      password: '',
      isActive: false,
      token: '' /* solo para response */,
    },
  ]);

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  get adminUsers() {
    return this.users().filter((user) => user.roles.includes('admin'));
  }

  get normalUsers() {
    return this.users().filter((user) => user.roles.includes('user'));
  }

  constructor(private adminService: AdminService) {}
}
