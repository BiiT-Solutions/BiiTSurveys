import {FormItem} from "./form-item";

export class RepeatableGroupResult extends FormItem {
  repeatable: boolean;
  children: FormItem[];

  constructor() {
    super('com.biit.form.result.RepeatableGroupResult');
  }
}
