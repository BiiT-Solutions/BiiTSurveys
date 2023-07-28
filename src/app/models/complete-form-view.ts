import {SurveyItem} from "./survey-item";

export class CompleteFormView extends SurveyItem {
  version: number;
  organizationId: number;
  description: string;
  flows: any[];
  webserviceCalls: any[];
  status: string;
  linkedFormVersions: any[];
  elementsToHide: SurveyItem[];

  public static override copy(from: CompleteFormView, to: CompleteFormView): CompleteFormView {
    super.copy(from, to);
    to.version = from.version;
    to.organizationId = from.organizationId;
    to.description = from.description;
    to.flows = from.flows;
    to.webserviceCalls = from.webserviceCalls;
    to.status = from.status;
    to.linkedFormVersions = from.linkedFormVersions;
    to.elementsToHide = from.elementsToHide;
    return to;
  }
  public static override clone(from: CompleteFormView): CompleteFormView {
    return CompleteFormView.copy(from, new CompleteFormView());
  }
}
