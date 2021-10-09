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
import { IMeData } from '../../../../@core/interfaces/session.interface';
import { AuthService } from '../../../../@core/services/auth.service';

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
  session: IMeData = {
    status: false
  };
  access = false;
  userLabel = '';

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {
    // this.store.select('session').subscribe(session => {
    //   const {logedIn, user} = session
    //   this.logedIn = logedIn
    //   this.role = user?.role
    //   this.name = `${user?.name} ${user?.lastname}`
    // })
    this.authService.accessVar$.subscribe((result) => {
      this.session = result;
      this.access = this.session.status;
      this.logedIn = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
    });

    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cartItemsTotal = data.subtotal;
      }
    });

    this.cartService.itemsVar$.subscribe((data:ICart) =>{
      if(data) {
        this.cartItemsTotal = data.subtotal
      }

    })
  }

  ngOnInit(): void {
     this.cartItemsTotal = this.cartService.initialize().subtotal
  }

  // public logOut(){
  //   if(REDIRECT_ROUTES.includes(this.router.url)){
  //     localStorage.setItem('route_after_login', this.router.url)
  //   }
  //   // this.store.dispatch(unSetUser())
  // }

  async logOut() {
    this.authService.resetSession(this.router.url);
  }

  open(){
    this.cartService.open()
  }

}
