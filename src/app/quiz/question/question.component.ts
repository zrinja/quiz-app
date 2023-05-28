import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from 'src/app/shared/models/quiz.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Output() questionId$: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  selectedAnswer: { answerId: number; questionId: number } = {
    answerId: 0,
    questionId: 0,
  };

  constructor() {}

  ngOnInit(): void {}

  emitAnswer(answerId: number, questionId: number) {
    this.selectedAnswer.answerId = answerId;
    this.selectedAnswer.questionId = questionId;

    this.questionId$.next(answerId);
  }
}
