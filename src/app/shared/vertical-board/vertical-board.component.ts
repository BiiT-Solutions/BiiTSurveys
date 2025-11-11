import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CompleteFormView} from "../../models/complete-form-view";
import {BiitProgressBarType} from "@biit-solutions/wizardry-theme/info";
import {Queue} from "../../utils/queue";
import {SurveyItem} from "../../models/survey-item";
import {FormResult} from "../../models/form/form-result";
import {Constants} from "../constants";
import {LoginRequest} from "@biit-solutions/authorization-services";
import {SurveysService} from "../../services/surveys.service";
import {EventService} from "../../services/events/event-service";
import {AuthService} from "@biit-solutions/kafka-event-structure"
import {BiitIconService} from "@biit-solutions/wizardry-theme/icon";
import {completeIconSet} from "@biit-solutions/biit-icons-collection";
import {SurveyAnswer} from "../../models/survey-answer";
import {SessionService} from "../../services/session.service";
import {Form} from "../../models/form/form";
import {FormFormatter} from "../../utils/form-formatter";
import {TRANSLOCO_SCOPE, TranslocoService} from "@ngneat/transloco";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'biit-vertical-board',
  templateUrl: './vertical-board.component.html',
  styleUrls: ['./vertical-board.component.scss'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      multi:true,
      useValue: {scope: 'forms/haw', alias: 'form'}
    }
  ],
})
export class VerticalBoardComponent implements OnInit {
  @Output() onSubmit: EventEmitter<FormResult> = new EventEmitter();
  protected survey: CompleteFormView;
  protected questions: Queue<SurveyItem>;
  protected totalQuestions: number;
  protected currentQuestion: SurveyItem;
  protected currentQuestionIndex: number = 0;
  protected currentAnswers: SurveyItem[];

  private questionsAnswered: SurveyAnswer[] = [];

  protected readonly BiitProgressBarType = BiitProgressBarType;
  protected readonly Math: Math = Math;

  constructor(private surveysService: SurveysService,
              private eventService: EventService,
              private authService: AuthService,
              private deviceService: DeviceDetectorService,
              biitIconService: BiitIconService) {
    biitIconService.registerIcons(completeIconSet);
  }


  ngOnInit(): void {
    /*This workaround prevent wrong viewport view on phones and tablets browsers*/
    if (this.deviceService.isMobile() || this.deviceService.isTablet()) {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    }

    this.checkAuth();
    this.surveysService.getSurvey('HAW').subscribe((response: CompleteFormView): void => {
      this.survey = CompleteFormView.clone(response);
      this.questions = new Queue<SurveyItem>([...this.survey.getChildren("com.biit.webforms.persistence.entity.Question")]);
      this.totalQuestions = this.questions.size();
      if (!this.questions.isEmpty()) {
        this.nextQuestion();
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

  protected onAnswered(answer: SurveyItem) {
    if (this.currentQuestion._selected) {
      return;
    }
    if (answer) {
      if (answer._selected) {
        return;
      }
      this.currentQuestion._selected = true;
      this.questionsAnswered.push(new SurveyAnswer(this.currentQuestion, answer));
      answer._selected = true;
    }
    setTimeout(() => !this.questions.isEmpty() ?  this.nextQuestion() : this.submit(), 1000);
  }

  private submit(): void {
    const formResult: FormResult = FormFormatter.getFormResultFromCompleteFormView(this.survey, this.questionsAnswered);
    const customProperties: Map<string, string> = new Map<string, string>();
    customProperties.set("issuer", SessionService.getUser().username);
    customProperties.set("factType",  "formResult");
    this.eventService.sendEvent(formResult, Form.name, formResult.label, 'SUBMITTED', customProperties, 'form');
    this.onSubmit.emit(formResult);
  }

  private nextQuestion(): void {
    this.currentQuestion = this.questions.pop();
    this.currentAnswers = this.currentQuestion.children;
    this.currentQuestionIndex++;
  }

  protected addRippleClass(event: TouchEvent) {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    eventTarget.classList.add('ripple-active');
  }
}
