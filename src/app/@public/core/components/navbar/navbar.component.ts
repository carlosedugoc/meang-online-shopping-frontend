import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@main/app.reducer';
import { unSetUser } from '../../../pages/forms/login/state/login.actions';
import shopMenuItems from '@data/menus/shop.json'
import { IMenuItem } from '../../../../@core/interfaces/menu-item';
import { CartService } from '@shop/core/services/cart.service';
import { Router } from '@angular/router';
import { REDIRECT_ROUTES } from '@core/constants/config';
import { ICart } from '@shop/core/services/shopping-cart.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems: Array<IMenuItem> = shopMenuItems
  cartItemsTotal: number
  public logedIn = false;
  public role: string;
  public name: string

  constructor(private store: Store<AppState>, private cartService: CartService, private router: Router) {
    this.store.select('session').subscribe(session => {
      const {logedIn, user} = session
      this.logedIn = logedIn
      this.role = user?.role
      this.name = `${user?.name} ${user?.lastname}`
    })

    this.cartService.itemsVar$.subscribe((data:ICart) =>{
      if(data) {
        this.cartItemsTotal = data.subtotal
      }

    })
  }

  ngOnInit(): void {
     this.cartItemsTotal = this.cartService.initialize().subtotal
  }

  public logOut(){
    if(REDIRECT_ROUTES.includes(this.router.url)){
      localStorage.setItem('route_after_login', this.router.url)
    }
    this.store.dispatch(unSetUser())
  }

  open(){
    this.cartService.open()
  }

}
