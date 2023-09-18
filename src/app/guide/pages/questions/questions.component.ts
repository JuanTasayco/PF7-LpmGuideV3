import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { InfoSectionsService } from '../../services/info-sections.service';
import { QuestionsData } from '../../interfaces/question.interface';
import { Subscription } from 'rxjs';
import { Flowbite } from '../../decorator/flowbite-decorator';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
@Flowbite()
export class QuestionsComponent implements OnInit {
  public questions = signal<QuestionsData[]>([]);

  ngOnInit(): void {
    this.infoSectionsService.getQuestions().subscribe((results) => {
      this.questions.set(results);
    });
    initFlowbite();
  }

  constructor(
    private infoSectionsService: InfoSectionsService,
    private cdr: ChangeDetectorRef
  ) {}
}
