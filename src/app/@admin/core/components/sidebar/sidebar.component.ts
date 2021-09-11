import { Component, OnInit } from '@angular/core';
import adminMenuItems from '@data/menus/admin.json'
import { IMenuItem } from '@core/interfaces/menu-item';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: Array<IMenuItem> = adminMenuItems

  constructor() { }

  ngOnInit(): void {
  }

}
