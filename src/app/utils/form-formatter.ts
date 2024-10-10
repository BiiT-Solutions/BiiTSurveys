import {CompleteFormView} from "../models/complete-form-view";
import {FormResult} from "../models/form/form-result";
import {CategoryResult} from "../models/form/category-result";
import {SurveyAnswer} from "../models/survey-answer";
import {SessionService} from "../services/session.service";
import {FormItem} from "../models/form/form-item";
import {v4 as uuid} from "uuid";
import {QuestionWithValueResult} from "../models/form/question-with-value-result";

export class FormFormatter {
  public static getFormResultFromCompleteFormView(formView: CompleteFormView, questionsAnswered: SurveyAnswer[]): FormResult {
    const formResult: FormResult = new FormResult();
    FormFormatter.setDefaultFormItemValues(formResult);
    formResult.name = formView.name;
    formResult.label = formView.label;
    formResult.version = 1;
    formResult.children = formView.children.map(category => {
      const categoryResult: CategoryResult = FormFormatter.generateItem(category.name, category.label, new CategoryResult());
      categoryResult.children = questionsAnswered
        .filter(surveyAnswer => category.children.some(questionItem => questionItem.name === surveyAnswer.question.name))
        .map((answer: SurveyAnswer) => {
          return FormFormatter.generateQuestion(answer.question.name, answer.question.label, +answer.answer.name);
        });
      return categoryResult;
    });
    const customProperties = new Map<string, string>();
    customProperties.set("issuer", SessionService.getUser().username);
    customProperties.set("factType",  "formResult");
    return formResult;
  }

  private static setDefaultFormItemValues(formItem: FormItem): void {
    formItem.comparationId = uuid();
    formItem.creationTime = new Date();
    formItem.updateTime = new Date();
  }
  private static generateItem<T extends FormItem>(name: string, label: string, item: T): T {
    item.name = name;
    item.label = label;
    FormFormatter.setDefaultFormItemValues(item);
    return item;
  }
  private static generateQuestion(name: string, label: string, value: number): QuestionWithValueResult {
    const questionWithValueResult: QuestionWithValueResult = FormFormatter.generateItem(name, label, new QuestionWithValueResult());
    FormFormatter.setDefaultFormItemValues(questionWithValueResult);
    questionWithValueResult.values = [value];
    questionWithValueResult.answerLabels = [];
    return questionWithValueResult;
  }

}
