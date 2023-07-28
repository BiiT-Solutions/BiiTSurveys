import {SurveyItem} from "./survey-item";

export class SurveyAnswer {
  question: SurveyItem;
  answer: SurveyItem;


  constructor(question: SurveyItem, answer: SurveyItem) {
    this.question = question;
    this.answer = answer;
  }
}
