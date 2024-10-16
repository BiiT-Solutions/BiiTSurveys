import {FormItem} from "./form-item";

export class FormResult extends FormItem {
  submittedAt: Date = new Date();
  updatedBy: number;
  version: number;
  organizationId: number;
  children: FormItem[] = [];

  constructor() {
    super('com.biit.form.result.FormResult');
  }
}
