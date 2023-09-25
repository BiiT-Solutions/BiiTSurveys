import {Component} from '@angular/core';
import {RootService} from "kafka-event-structure-lib";
import {Environment} from "../environments/environment";
import customEnvironment from '../assets/environment.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private rootService: RootService) {

    console.log('-------------',customEnvironment.protocol)
    console.log('-------------',customEnvironment.domain)
    if (customEnvironment.protocol && customEnvironment.domain) {
      Environment.ROOT_URL = `${customEnvironment.protocol}://${customEnvironment.domain}`;
    }
    console.log('------------->',Environment.ROOT_URL)

    rootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.KAFKA_PROXY_PATH}`);
  }
}
