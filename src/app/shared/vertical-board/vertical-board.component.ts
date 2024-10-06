import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompleteFormView} from "../../models/complete-form-view";
import {BiitProgressBarType} from "biit-ui/info";
import {Queue} from "../../utils/queue";
import {SurveyItem} from "../../models/survey-item";
import {FormResult} from "../../models/form/form-result";
import {Constants} from "../constants";
import {LoginRequest} from "authorization-services-lib";
import {SurveysService} from "../../services/surveys.service";
import {EventService} from "../../services/events/event-service";
import {AuthService} from "kafka-event-structure-lib";
import {BiitIconService} from "biit-ui/icon";
import {completeIconSet} from "biit-icons-collection";
import {SurveyAnswer} from "../../models/survey-answer";

@Component({
  selector: 'biit-vertical-board',
  templateUrl: './vertical-board.component.html',
  styleUrls: ['./vertical-board.component.scss']
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
              biitIconService: BiitIconService) {
    biitIconService.registerIcons(completeIconSet);
  }


  ngOnInit(): void {
    const vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    this.checkAuth();
    this.surveysService.getSurvey('nca').subscribe((response: CompleteFormView): void => {
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
    if (!this.questions.isEmpty()) {
      setTimeout(() => this.nextQuestion(), 1000);
    }
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
