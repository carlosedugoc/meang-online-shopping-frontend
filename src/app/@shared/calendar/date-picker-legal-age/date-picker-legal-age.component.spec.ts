import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerLegalAgeComponent } from './date-picker-legal-age.component';

describe('DatePickerLegalAgeComponent', () => {
  let component: DatePickerLegalAgeComponent;
  let fixture: ComponentFixture<DatePickerLegalAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerLegalAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerLegalAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
