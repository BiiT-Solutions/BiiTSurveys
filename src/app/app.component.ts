import { Component } from '@angular/core';
import {RootService} from "kafka-event-structure-lib";
import {Environment} from "../environments/environment";
import {Constants} from "./shared/constants";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  submitted = false;
  constructor(private rootService: RootService) {
    rootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.KAFKA_PROXY_PATH}`);
    this.checkAuth();
  }

  private checkAuth(): void {
    const token: string = sessionStorage.getItem(Constants.SESSION_STORAGE.AUTH_TOKEN);
    if (!token) {
      const newToken: string = window.prompt('Insert your token');
      sessionStorage.setItem(Constants.SESSION_STORAGE.AUTH_TOKEN, newToken);
    }
  }
}
