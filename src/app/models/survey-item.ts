export class SurveyItem {
  class: string;
  id: number;
  comparationId: string;
  creationTime: Date;
  updateTime: Date;
  name: string;
  label: string;
  label2: string;
  hidden: boolean;
  children: SurveyItem[];

  public static copy(from: SurveyItem, to: SurveyItem): SurveyItem {
    to.class = from.class;
    to.id = from.id;
    to.comparationId = from.comparationId;
    to.creationTime = from.creationTime ? new Date(from.creationTime) : null;
    to.updateTime = from.updateTime ? new Date(from.updateTime) : null;
    to.name = from.name;
    to.label = from.label;
    to.label2 = from.label2;
    to.hidden = from.hidden;
    to.children = from.children ? from.children.map(child => SurveyItem.clone(child)) : [];
    return to;
  }

  public static clone(from: SurveyItem): SurveyItem {
    return SurveyItem.copy(from, new SurveyItem());
  }

  public getChildren(className: string): SurveyItem[] {
    const children: SurveyItem[] = [];
    this.appendChildren(className, this.children, children);
    return children;
  }

  private appendChildren(className: string, currentChildren: SurveyItem[], filteredChildren: SurveyItem[]): void {
    if (currentChildren) {
      for (let child of currentChildren) {
        if (child.class === className) {
          filteredChildren.push(child);
        }
        this.appendChildren(className, child.children, filteredChildren);
      }
    }
  }

}
