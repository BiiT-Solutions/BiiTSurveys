import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'biit-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.css']
})
export class SubmittedComponent {
  @Output() onReturn= new EventEmitter<void>();
}
