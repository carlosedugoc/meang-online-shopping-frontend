import { Component, OnInit } from '@angular/core';
import { CURRENCY_SELECT, CURRENCY_CODE } from '@core/constants/config';
import { CartService } from '@shop/core/services/cart.service';
import { ICart } from '@shop/core/services/shopping-cart.interface';

@Component({
  selector: 'app-checkout-resume',
  templateUrl: './checkout-resume.component.html',
  styleUrls: ['./checkout-resume.component.scss']
})
export class CheckoutResumeComponent implements OnInit {
  currencySelect = CURRENCY_SELECT
  currencyCode = CURRENCY_CODE
  cart: ICart

  constructor(private cartService: CartService) {
    this.cartService.itemsVar$.subscribe((data:ICart) => {
      if(data) this.cart = data
    })
  }

  ngOnInit(): void {
    this.cart = this.cartService.initialize()
  }

}
