import {Component, OnInit} from '@angular/core';
import {AuthService, RootService} from "kafka-event-structure-lib";
import {LoginRequest} from "authorization-services-lib";
import {Environment} from "../environments/environment";
import {Constants} from "./shared/constants";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private rootService: RootService) {
    rootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.KAFKA_PROXY_PATH}`);
  }
}
