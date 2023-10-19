import { Component, OnInit, signal, computed } from '@angular/core';
import { CardUserComponent } from '../../components/card-user/card-user.component';
import { AdminService } from '../../services/admin.service';
import { User } from '../../interfaces/admin.interfaces';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { SearchComponent } from 'src/app/shared/search/search.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CardUserComponent, JsonPipe, NgFor, NgIf, SearchComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public allUsers = signal<User[]>([]);
  public currentUsers = signal<User[]>([]);
  existResults: boolean = false;

  get adminUsers() {
    return this.currentUsers().filter((user) => user.roles.includes('admin'));
  }

  get normalUsers() {
    return this.currentUsers().filter((user) => user.roles.includes('user'));
  }

  getTextUser(textUser: string) {
    this.adminService.getUsersByName(textUser).subscribe((results) => {
      this.currentUsers.update(() => results);
    });
    if (textUser.length == 0) {
      this.currentUsers.update(() => this.allUsers());
    }
  }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((users) => {
      this.allUsers.set(users);
      this.currentUsers.set(this.allUsers());
    });
  }

  constructor(private adminService: AdminService) {}
}
