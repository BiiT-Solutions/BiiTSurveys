import {FormItem} from "./form-item";

export class QuestionWithValueResult extends FormItem {

  constructor() {
    super('com.biit.form.result.QuestionWithValueResult');
  }

  values: number[] = [];
  answerLabels: string[] = [];
}
