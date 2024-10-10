import {Component} from '@angular/core';
import { KafkaEventStructureRootService } from "kafka-event-structure-lib";
import {Environment} from "../environments/environment";
import {BiitSnackbarHorizontalPosition, BiitSnackbarService, BiitSnackbarVerticalPosition} from "biit-ui/info";
import {TranslocoService} from "@ngneat/transloco";
import {UserManagerRootService} from "user-manager-structure-lib";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(rootService: KafkaEventStructureRootService,
              userManagerRootService: UserManagerRootService,
              transloco: TranslocoService,
              snackbarService: BiitSnackbarService) {
    userManagerRootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.USER_MANAGER_SYSTEM}`);
    rootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.KAFKA_PROXY_PATH}`);
    snackbarService.setPosition(BiitSnackbarVerticalPosition.TOP, BiitSnackbarHorizontalPosition.CENTER);
    transloco.setActiveLang(navigator.language.split('-')[0]);
  }
}
