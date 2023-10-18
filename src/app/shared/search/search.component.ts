import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { Observable, Subject, debounceTime } from 'rxjs';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit, OnInit {
  activatedSearch: boolean = false;

  @Input('place') placeholderName: string = '';
  @Output() eventValueText = new EventEmitter<string>();

  obsTextUser = new Subject<string>();

  getSearchUser(eventUser: Event) {
    if (eventUser) {
    }
    const { value: valueText } = eventUser?.target as HTMLInputElement;
    this.obsTextUser.next(valueText);
  }

  ngOnInit(): void {
    this.obsTextUser.pipe(debounceTime(500)).subscribe((text) => {
      this.eventValueText.emit(text);
    });
  }

  ngAfterViewInit(): void {}
}
