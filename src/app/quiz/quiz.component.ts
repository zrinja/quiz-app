import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Direction, Page, QuizCategory } from '../shared/enums/quiz.enum';
import {
  Question,
  Quiz,
  QuizCategories,
  ResultsKey,
} from '../shared/models/quiz.model';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  quizCategories: QuizCategories[] = [];
  angularQuestions: Question[];
  designPatternsQuestions: Question[];
  javaQuestions: Question[];
  questions: Question[] = [];
  questionId: number = 1;
  question: Question;
  form: any;
  page: string = Page.Questions;
  resultsKey: ResultsKey[] = [];

  constructor(
    private _quizService: QuizService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getInitialData();
    this.questions = this.angularQuestions;

    this.form.valueChanges.subscribe((result) => {
      this.changeQuestionsByCategory(result.name);
      this.questionId = 1;
      this.changeQuestion(this.questionId);
    });

    this.question = this.questions[0];
  }

  mapResults(result: Quiz) {
    let resultsKey: ResultsKey = {
      category: result.name,
      correctAnswers: [],
    };

    result.questions.forEach((question) => {
      resultsKey.correctAnswers.push({
        questionId: question.question_id,
        answerId: question.correct_answer,
      });
    });

    this.resultsKey.push(resultsKey);
  }

  createForm() {
    this.form = this._formBuilder.group({
      name: QuizCategory.Angular,
    });
  }

  getInitialData() {
    this._quizService.getAngularQuestions().subscribe((data: Quiz) => {
      this.mapResults(data);
      this.quizCategories.push({ name: data.name, enabled: true });
      this.angularQuestions = data.questions;
    });
    this._quizService.getDesignPaternQuestions().subscribe((data: Quiz) => {
      this.mapResults(data);
      this.quizCategories.push({ name: data.name, enabled: true });
      this.designPatternsQuestions = data.questions;
    });
    this._quizService.getJavaQuestions().subscribe((data: Quiz) => {
      this.mapResults(data);
      this.quizCategories.push({ name: data.name, enabled: true });
      this.javaQuestions = data.questions;
    });
  }

  changeQuestionsByCategory(categoryName: string): void {
    switch (categoryName) {
      case QuizCategory.Design_Patterns:
        this.questions = this.designPatternsQuestions;
        break;
      case QuizCategory.Java:
        this.questions = this.javaQuestions;
        break;
      default:
        this.questions = this.angularQuestions;
        break;
    }
  }

  changeQuestion(id: number) {
    this.questionId = id;
    this.question = this.questions.find(
      (x) => x.question_id === this.questionId
    );
  }

  navigateQuestions(direction: string) {
    direction === Direction.Prev ? this.questionId-- : this.questionId++;
    this.changeQuestion(this.questionId);
  }

  addAnswer(event: number): void {
    const newAnswer = {
      questionId: this.questionId,
      answerId: event,
    };

    this._quizService.updateAnswer(
      this.form?.value.name,
      newAnswer,
      this.questionId
    );
  }

  submitPage(quizName: string) {
    this.quizCategories.find((x) => x.name === quizName).enabled = false;
    this.form.patchValue(
      this.quizCategories.filter((x) => x.enabled === true)[0]
    );

    if (this.quizCategories.every((x) => x.enabled === false)) {
      this.submitAll();
    }
  }

  checkIfDisabled(quizName: string) {
    return !this.quizCategories.find((x) => x.name === quizName).enabled;
  }

  submitAll() {
    this.page = Page.Results;
  }
}
