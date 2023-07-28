import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompleteFormView} from "../models/complete-form-view";

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http: HttpClient) { }

  getSurvey(file: string): Observable<CompleteFormView> {
    return this.http.get<CompleteFormView>(`assets/surveys/${file}.json`);
  }
}
