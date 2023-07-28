import {FormItem} from "./form-item";


export class CategoryResult extends FormItem{
  children: FormItem[];

  constructor() {
    super('com.biit.form.result.CategoryResult');
  }
}
