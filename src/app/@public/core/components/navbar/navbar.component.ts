import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@main/app.reducer';
import { unSetUser } from '../../../pages/forms/login/state/login.actions';
import shopMenuItems from '@data/menus/shop.json'
import { IMenuItem } from '../../../../@core/interfaces/menu-item';
import { CartService } from '@shop/core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems: Array<IMenuItem> = shopMenuItems
  public logedIn = false;
  public role: string;
  public name: string

  constructor(private store: Store<AppState>, private cartService: CartService) {
    this.store.select('session').subscribe(session => {
      const {logedIn, user} = session
      this.logedIn = logedIn
      this.role = user?.role
      this.name = `${user?.name} ${user?.lastname}`
    })
  }

  ngOnInit(): void {

  }

  public logOut(){
    this.store.dispatch(unSetUser())
  }

  open(){
    this.cartService.open()
  }

}
