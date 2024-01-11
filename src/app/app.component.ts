import {Component} from '@angular/core';
import { KafkaEventStructureRootService } from "kafka-event-structure-lib";
import {Environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BiitSnackbarHorizontalPosition, BiitSnackbarService, BiitSnackbarVerticalPosition} from "biit-ui/info";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(rootService: KafkaEventStructureRootService, private http: HttpClient, private snackbarService: BiitSnackbarService) {
    rootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.KAFKA_PROXY_PATH}`);
    snackbarService.setPosition(BiitSnackbarVerticalPosition.TOP, BiitSnackbarHorizontalPosition.CENTER);
  }
}
