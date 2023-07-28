import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyBoardComponent } from './survey-board.component';

describe('SurveyBoardComponent', () => {
  let component: SurveyBoardComponent;
  let fixture: ComponentFixture<SurveyBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
