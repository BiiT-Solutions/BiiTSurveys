import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMultiTextComponent } from './survey-multi-text.component';

describe('SurveyMultiTextComponent', () => {
  let component: SurveyMultiTextComponent;
  let fixture: ComponentFixture<SurveyMultiTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyMultiTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyMultiTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
