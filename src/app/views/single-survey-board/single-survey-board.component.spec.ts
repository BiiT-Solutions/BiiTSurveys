import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSurveyBoardComponent } from './single-survey-board.component';

describe('SingleSurveyBoardComponent', () => {
  let component: SingleSurveyBoardComponent;
  let fixture: ComponentFixture<SingleSurveyBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSurveyBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSurveyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
