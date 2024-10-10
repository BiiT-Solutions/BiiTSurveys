import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalSurveyBoardComponent } from './vertical-survey-board.component';

describe('VerticalSurveyBoardComponent', () => {
  let component: VerticalSurveyBoardComponent;
  let fixture: ComponentFixture<VerticalSurveyBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalSurveyBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalSurveyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
