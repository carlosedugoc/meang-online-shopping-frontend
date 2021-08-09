import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  toggleValue = true
  @Output() toggleChanged = new EventEmitter<boolean>()

  toggled(){
    if(this.toggleValue === undefined) this.toggleValue = true
    this.toggleValue = !this.toggleValue
    this.toggleChanged.emit(this.toggleValue)
  }


}
