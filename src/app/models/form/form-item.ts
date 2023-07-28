export class FormItem {
  class: string;
  comparationId: string;
  creationTime: Date = new Date();
  updateTime: Date = new Date();
  name: string;
  label: string;
  constructor(clazz: string) {
    this.class = clazz;
   }

}
