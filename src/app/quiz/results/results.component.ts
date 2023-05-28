import { Component, Input, OnInit } from '@angular/core';
import { QuizCategory } from 'src/app/shared/enums/quiz.enum';
import {
  QuestionAnswer,
  Result,
  ResultsKey,
} from 'src/app/shared/models/quiz.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  @Input() resultsKey: ResultsKey[];

  results: Result[] = [];
  totalCorrectAnswers: number = 0;
  totalQuestions: number = 0;

  constructor(private _quizService: QuizService) {}

  ngOnInit(): void {
    this.calculateResults();
  }

  calculateResults() {
    this.resultsKey.forEach((resultKey) => {
      const categoryCounter = this.calculateCategoryCounter(resultKey);
      const result: Result = {
        category: resultKey.category,
        numberOfCorrectAnswers: categoryCounter,
        numberOfQuestions: resultKey.correctAnswers.length,
      };
      this.results.push(result);
    });

    this.results.forEach((result) => {
      this.totalCorrectAnswers =
        this.totalCorrectAnswers + result.numberOfCorrectAnswers;
      this.totalQuestions = this.totalQuestions + result.numberOfQuestions;
    });
  }

  calculateCategoryCounter(resultKey: ResultsKey): number {
    let categoryCounter = 0;

    const categoryAnswers = this.getCategoryAnswers(resultKey.category);

    categoryAnswers.forEach((answer: QuestionAnswer) => {
      const correctAnswer = resultKey.correctAnswers.find(
        (x) => x.questionId === answer.questionId
      );

      if (answer.answerId === correctAnswer.answerId) {
        categoryCounter++;
      }
    });

    return categoryCounter;
  }

  getCategoryAnswers(category: string): QuestionAnswer[] {
    switch (category) {
      case QuizCategory.Angular:
        return this._quizService.angularAnswers;
      case QuizCategory.Design_Patterns:
        return this._quizService.designPatternsAnswers;
      case QuizCategory.Java:
        return this._quizService.javaAnswers;
      default:
        return [];
    }
  }

  refresh() {
    window.location.reload();
  }
}
