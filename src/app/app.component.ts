import {Component} from '@angular/core';
import { KafkaEventStructureRootService } from "kafka-event-structure-lib";
import {Environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(rootService: KafkaEventStructureRootService, private http: HttpClient) {
    rootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.KAFKA_PROXY_PATH}`);
  }
}
