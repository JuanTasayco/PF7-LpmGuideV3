import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { gsap } from 'gsap';
import { Observable, Subject, debounceTime } from 'rxjs';
import { User } from 'src/app/admin/interfaces/admin.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit, OnInit {
  activatedSearch: boolean = false;
  @Input('existResultsSearch') existResults: boolean = false;
  @Input('currentUsers') currentUsers: User[] = [];
  @Input('placeh') placeholderName: string = '';
  @Output() eventValueText = new EventEmitter<string>();

  obsTextUser = new Subject<string>();

  getSearchUser(eventUser: Event) {
    const { value: valueText } = eventUser?.target as HTMLInputElement;
    this.obsTextUser.next(valueText);
    if (valueText.length == 0) {
      this.existResults = false;
    } else {
      this.existResults = true;
    }
  }

  selectUser(id: string) {
    console.log(id);
    this.router.navigate(['/admin/user/edit/', id]);
  }

  ngOnInit(): void {
    this.obsTextUser.pipe(debounceTime(500)).subscribe((text) => {
      this.eventValueText.emit(text.toLowerCase());
    });
  }

  constructor(private router: Router) {}

  ngAfterViewInit(): void {}
}
