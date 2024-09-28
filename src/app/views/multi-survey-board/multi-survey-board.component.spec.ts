import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSurveyBoardComponent } from './multi-survey-board.component';

describe('MultiSurveyBoardComponent', () => {
  let component: MultiSurveyBoardComponent;
  let fixture: ComponentFixture<MultiSurveyBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSurveyBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSurveyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
