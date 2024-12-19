import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CompleteFormView} from "../../models/complete-form-view";
import {SurveysService} from "../../services/surveys.service";
import {SurveyItem} from "../../models/survey-item";
import {Queue} from "../../utils/queue";
import {SurveyAnswer} from "../../models/survey-answer";
import {FormItem} from "../../models/form/form-item";
import {v4 as uuid} from "uuid";
import {FormResult} from "../../models/form/form-result";
import {CategoryResult} from "../../models/form/category-result";
import {QuestionWithValueResult} from "../../models/form/question-with-value-result";
import {Form} from "../../models/form/form";
import {EventService} from "../../services/events/event-service";
import {Constants} from "../constants";
import {LoginRequest} from "authorization-services-lib";
import {AuthService} from "kafka-event-structure-lib";
import {BiitIconService} from 'biit-ui/icon';
import {completeIconSet} from 'biit-icons-collection';
import {SessionService} from "../../services/session.service";
import {FormFormatter} from "../../utils/form-formatter";

@Component({
  selector: 'biit-survey-board',
  templateUrl: './survey-board.component.html',
  styleUrls: ['./survey-board.component.scss']
})
export class SurveyBoardComponent implements OnInit {

  @Output() onSubmit: EventEmitter<FormResult> = new EventEmitter();
  protected survey: CompleteFormView;
  protected questions: Queue<SurveyItem>;

  protected firstQuestion: SurveyItem;
  protected secondQuestion: SurveyItem;

  protected currentQuestion: number = 0;
  protected totalQuestions: number = 0;
  protected currentAnswers: SurveyItem[];
  public timeout: NodeJS.Timeout;
  private questionsAnswered: SurveyAnswer[] = [];

  private onTimeOut: () => void = (): void => {
    this.nextQuestion();
  };

  constructor(private surveysService: SurveysService,
              private eventService: EventService,
              private authService: AuthService,
              biitIconService: BiitIconService) {
    biitIconService.registerIcons(completeIconSet);
  }

  ngOnInit(): void {
    this.checkAuth();
    this.surveysService.getSurvey('nca').subscribe((response: CompleteFormView): void => {
      this.survey = CompleteFormView.clone(response);
      this.questions = new Queue<SurveyItem>([...this.survey.getChildren("com.biit.webforms.persistence.entity.Question")]);
      this.totalQuestions = this.questions.size();
      if (!this.questions.isEmpty()) {
        this.firstQuestion = this.questions.pop();
        this.currentAnswers = this.firstQuestion.children;
        this.currentQuestion++;
      }
      this.startTimeout();
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

  protected nextQuestion(answer?: SurveyItem): void {
    if (answer) {
      this.questionsAnswered.push(new SurveyAnswer(this.currentQuestion % 2 ? this.firstQuestion : this.secondQuestion, answer));
    }
    if (this.questions.size() === 0) {
      this.stopTimeout();
      this.sendSurvey();
      return;
    }
    if (this.currentQuestion % 2) {
      this.secondQuestion = this.questions.pop();
      this.currentAnswers = this.secondQuestion.children;
    } else {
      this.firstQuestion = this.questions.pop();
      this.currentAnswers = this.firstQuestion.children;
    }
    this.currentQuestion++;
    this.startTimeout();
  }

  private startTimeout(): void {
    this.stopTimeout();
    this.timeout = setTimeout(this.onTimeOut, 6000);
  }

  private stopTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  private sendSurvey(): void {
    const formResult: FormResult = FormFormatter.getFormResultFromCompleteFormView(this.survey, this.questionsAnswered);
    const customProperties = new Map<string, string>();
    customProperties.set("issuer", SessionService.getUser().username);
    customProperties.set("factType",  "formResult");
    this.eventService.sendEvent(formResult, Form.name, formResult.label, 'SUBMITTED', customProperties, 'form');
    this.onSubmit.emit(formResult);
  }


}
