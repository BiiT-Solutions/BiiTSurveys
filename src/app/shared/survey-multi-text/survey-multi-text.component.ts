import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CompleteFormView} from "../../models/complete-form-view";
import {Queue} from "../../utils/queue";
import {SurveyItem} from "../../models/survey-item";
import {SurveysService} from "../../services/surveys.service";
import {SurveyAnswer} from "../../models/survey-answer";
import {FormResult} from "../../models/form/form-result";
import {CategoryResult} from "../../models/form/category-result";
import {v4 as uuid} from "uuid";
import {Form} from "../../models/form/form";
import {QuestionWithValueResult} from "../../models/form/question-with-value-result";
import {FormItem} from "../../models/form/form-item";
import {EventService} from "../../services/events/event-service";
import {Constants} from "../constants";
import {LoginRequest} from "authorization-services-lib";
import {AuthService} from "kafka-event-structure-lib";

@Component({
  selector: 'biit-survey-multi-text',
  templateUrl: './survey-multi-text.component.html',
  styleUrls: ['./survey-multi-text.component.scss']
})
export class SurveyMultiTextComponent implements OnInit {
  protected survey: CompleteFormView;
  protected questions: Queue<SurveyItem>;
  protected totalQuestions: number = 0;
  protected currentQuestion: SurveyItem;
  protected totalAsked: number = 0;
  protected currentAnswers: SurveyItem[];
  private questionsAnswered: SurveyAnswer[] = [];
  @Output() onSubmit: EventEmitter<FormResult> = new EventEmitter();

  constructor(private surveysService: SurveysService, private eventService: EventService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.checkAuth();
    this.surveysService.getSurvey('credibility').subscribe((response: CompleteFormView): void => {
      this.survey = CompleteFormView.clone(response);
      this.questions = new Queue<SurveyItem>([...this.survey.getChildren("com.biit.webforms.persistence.entity.Question")]);
      this.totalQuestions = this.questions.size();
      if (!this.questions.isEmpty()) {
        this.currentQuestion = this.questions.pop();
        this.currentAnswers = this.currentQuestion.children;
        this.totalAsked++;
      }
    });
  }

  private checkAuth(): void {
    const token: string = sessionStorage.getItem(Constants.SESSION_STORAGE.AUTH_TOKEN);
    if (!token) {
      this.authService.login(new LoginRequest('admin@test.com', 'asd123')).subscribe(response => {
        sessionStorage.setItem(Constants.SESSION_STORAGE.AUTH_TOKEN, response.headers.get(Constants.HEADERS.AUTHORIZATION_RESPONSE));
      });
    }
  }

  nextQuestion(answer: SurveyItem): void {
    if (answer) {
      this.questionsAnswered.push(new SurveyAnswer(this.currentQuestion, answer));
    }
    if (this.questions.size() === 0) {
      this.sendSurvey();
      return;
    }
    this.currentQuestion = this.questions.pop();
    this.currentAnswers = this.currentQuestion.children;
    this.totalAsked++;
  }

  private sendSurvey(): void {
    const formResult: FormResult = new FormResult();
    this.setDefaultFormItemValues(formResult);
    formResult.name = this.survey.name;
    formResult.label = this.survey.label;
    formResult.version = 1;
    const category: CategoryResult = this.generateItem(this.survey.children[0].name, this.survey.children[0].label, new CategoryResult());
    category.children = this.questionsAnswered.map((answer: SurveyAnswer) => {
      return this.generateQuestion(answer.question.name, answer.question.label, +answer.answer.name);
    });
    formResult.children = [category];
    const customProperties = new Map<string, string>();
    customProperties.set("issuer", uuid());
    this.eventService.sendEvent(formResult, Form.name, 'SUBMITTED', customProperties, 'form');
    this.onSubmit.emit(formResult);
  }

  private generateQuestion(name: string, label: string, value: number): QuestionWithValueResult {
    const questionWithValueResult: QuestionWithValueResult = this.generateItem(name, label, new QuestionWithValueResult());
    this.setDefaultFormItemValues(questionWithValueResult);
    questionWithValueResult.values = [value];
    questionWithValueResult.answerLabels = [];
    return questionWithValueResult;
  }

  private setDefaultFormItemValues(formItem: FormItem): void {
    formItem.comparationId = uuid();
    formItem.creationTime = new Date();
    formItem.updateTime = new Date();
  }

  private generateItem<T extends FormItem>(name: string, label: string, item: T): T {
    item.name = name;
    item.label = label;
    this.setDefaultFormItemValues(item);
    return item;
  }
}
