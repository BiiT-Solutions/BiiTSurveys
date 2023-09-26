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


  constructor(private rootService: RootService, private http: HttpClient) {


    this.getEnvironment().subscribe((_customEnvironment: any): void => {
      console.log('$$----------------', _customEnvironment.protocol);
      console.log('$$----------------', _customEnvironment.domain);
      if (_customEnvironment.protocol && _customEnvironment.domain) {
        Environment.ROOT_URL = `${_customEnvironment.protocol}://${_customEnvironment.domain}`;
      }
      console.log('$$----------------', Environment.ROOT_URL);
      rootService.serverUrl = new URL(`${Environment.ROOT_URL}${Environment.KAFKA_PROXY_PATH}`);
    });

  }

  getEnvironment(): Observable<any> {
    return this.http.get<any>(`assets/environment.json`);
  }
}
