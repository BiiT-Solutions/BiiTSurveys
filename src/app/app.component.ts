import {Component} from '@angular/core';
import {RootService} from "kafka-event-structure-lib";
import {Environment} from "../environments/environment";
import * as customEnvironment from '../assets/environment.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private rootService: RootService) {

    if (customEnvironment.protocol && customEnvironment.domain) {
      Environment.ROOT_URL = `${customEnvironment.protocol}://${customEnvironment.domain}`;
    }

    rootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.KAFKA_PROXY_PATH}`);
  }
}
