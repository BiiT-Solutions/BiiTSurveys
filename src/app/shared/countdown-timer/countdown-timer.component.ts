import {Component, Input} from '@angular/core';
import {iterator} from "rxjs/internal/symbol/iterator";

@Component({
  selector: 'biit-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent {
  @Input() set run(value: number) {
    if (value !== this.oldValue) {
      this.oldValue = value;
      this.iterator = !this.iterator;
    }
  };
  private oldValue: number;
  protected iterator: boolean;
}
