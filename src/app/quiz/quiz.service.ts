import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import design_patern_questions from '../../assets/questions/design_patterns_questions.json';
import angular_questions from '../../assets/questions/angular_questions.json';
import java_questions from '../../assets/questions/java_questions.json';
import { Question, QuestionAnswer, Quiz } from '../shared/models/quiz.model';
import { QuizCategory } from '../shared/enums/quiz.enum';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  angularAnswers: QuestionAnswer[] = [];
  javaAnswers: QuestionAnswer[] = [];
  designPatternsAnswers: QuestionAnswer[] = [];

  constructor() {}

  getDesignPaternQuestions(): Observable<Quiz> {
    return of(design_patern_questions);
  }

  getAngularQuestions(): Observable<Quiz> {
    return of(angular_questions);
  }

  getJavaQuestions(): Observable<Quiz> {
    return of(java_questions);
  }

  updateAnswer(
    category: string,
    answer: QuestionAnswer,
    questionId: number
  ): void {
    switch (category) {
      case QuizCategory.Angular:
        this.updateCategoryAnswer(this.angularAnswers, answer, questionId);
        break;
      case QuizCategory.Java:
        this.updateCategoryAnswer(this.javaAnswers, answer, questionId);
        break;
      case QuizCategory.Design_Patterns:
        this.updateCategoryAnswer(
          this.designPatternsAnswers,
          answer,
          questionId
        );
        break;
      default:
        break;
    }
  }

  private updateCategoryAnswer(
    categoryAnswers: QuestionAnswer[],
    answer: QuestionAnswer,
    questionId: number
  ): void {
    const oldAnswerIndex = categoryAnswers.findIndex(
      (x) => x.questionId === questionId
    );

    if (oldAnswerIndex !== -1) {
      categoryAnswers.splice(oldAnswerIndex, 1);
    }

    categoryAnswers.push(answer);
  }

  filterQuestionsByCategory(
    questions: Question[],
    category: string
  ): Question[] {
    return questions.filter((question) => question.category === category);
  }
}
