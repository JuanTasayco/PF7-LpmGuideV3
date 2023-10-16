import { Component, Input, OnInit, signal } from '@angular/core';
import {
  CommonModule,
  KeyValuePipe,
  NgFor,
  TitleCasePipe,
} from '@angular/common';
import { User } from '../../interfaces/admin.interfaces';
import { ImgPipe } from 'src/app/guide/pipes/img.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [NgFor, KeyValuePipe, TitleCasePipe, ImgPipe, RouterModule],
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss'],
})
export class CardUserComponent implements OnInit {
  @Input() usersArray: User[] = [];
  ngOnInit(): void {}

  getkeysUser(user: User) {
    return user;
  }
}
