export interface Quiz {
  name: string;
  questions: Question[];
}

export interface Question {
  category: string;
  question_id: number;
  question: string;
  answers: Answer[];
  correct_answer: number;
}

export interface Answer {
  id: number;
  value: string;
}

export interface QuizCategories {
  name: string;
  enabled: boolean;
}

export interface QuestionAnswer {
  questionId: number;
  answerId: number;
}

export interface Result {
  category: string;
  numberOfCorrectAnswers: number;
  numberOfQuestions: number;
}

export interface ResultsKey {
  category: string;
  correctAnswers: QuestionCorrectAnswer[];
}

export interface QuestionCorrectAnswer {
  questionId: number;
  answerId: number;
}
