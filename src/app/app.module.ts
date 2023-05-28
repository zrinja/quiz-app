import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QuizComponent } from './quiz/quiz.component';

import { AppComponent } from './app.component';
import { QuestionComponent } from './quiz/question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './quiz/results/results.component';

@NgModule({
  declarations: [AppComponent, QuizComponent, QuestionComponent, ResultsComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
