import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss']
})
export class DatePickerLegalAgeComponent {


  private CURRENTDAY: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  }

  public minDate: NgbDateStruct = {
    year: this.CURRENTDAY.year - 100,
    month: this.CURRENTDAY.month,
    day: this.CURRENTDAY.day,
  }

  public maxDate: NgbDateStruct = {
    year: this.CURRENTDAY.year - 18,
    month: this.CURRENTDAY.month,
    day: this.CURRENTDAY.day,
  }

  public model: NgbDateStruct = this.maxDate

  @Output() newDate = new EventEmitter<NgbDateStruct>()

  constructor() { }

  selectDateChange(){
    this.newDate.emit(this.model)
  }

}
