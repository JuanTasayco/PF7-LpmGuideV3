export interface Question {
  questions: QuestionsData[];
}

export interface QuestionsData {
  subtitle: string;
  text: string;
  id?: string;
}
