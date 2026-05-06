export type Screen = 'home' | 'results' | 'survey' | 'subjects' | 'profile';
 
export interface Subject {
  id: number;
  name: string;
  score: number;
}
 
export interface AppState {
  studentName: string;
  subjects: Subject[];
  surveyAnswers: number[];
  lastSurveyDate: string | null;
}