import { Component } from '@angular/core';
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'biit-vertical-survey-board',
  templateUrl: './vertical-survey-board.component.html',
  styleUrls: ['./vertical-survey-board.component.scss']
})
export class VerticalSurveyBoardComponent {
  protected submitted: boolean = false;

  constructor(private sessionService: SessionService) { }

  protected reload(): void {
    this.sessionService.clearToken();
    window.location.reload();
  }
}
