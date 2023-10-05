import {Component} from '@angular/core';
import {RootService} from "kafka-event-structure-lib";
import {Environment} from "../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(rootService: RootService, private http: HttpClient) {
    this.getEnvironment().subscribe((_customEnvironment: any): void => {
      if (_customEnvironment.protocol && _customEnvironment.domain) {
        Environment.ROOT_URL = `${_customEnvironment.protocol}://${_customEnvironment.domain}`;
      }
      rootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.KAFKA_PROXY_PATH}`);
    });

  }

  getEnvironment(): Observable<any> {
    return this.http.get<any>(`assets/environment.json`);
  }
}
