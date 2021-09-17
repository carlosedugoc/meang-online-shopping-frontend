import { Injectable } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Subject } from 'rxjs';
import { ICart } from './shopping-cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Array<IProduct> = []
  cart: ICart = {
    products: this.products,
    total: 0,
    subtotal: 0
  }
  public itemsVar = new Subject<ICart>();
  public itemsVar$ = this.itemsVar.asObservable()
  constructor() { }

  initialize() {
    const storeData = JSON.parse(localStorage.getItem('cart'))
    if (storeData !== null) {
      this.cart = storeData
    }
    return this.cart
  }

  public updateItemsInCart(newValue: ICart) {
    this.itemsVar.next(newValue)
  }

  manageProduct(product: IProduct) {
    const productTotal = this.cart.products.length
    if (productTotal === 0){
      this.cart.products.push(product)
    }else {
      let actionUpdateOk = false
      for (let i = 0; i < productTotal; i++) {
        if(product.id === this.cart.products[i].id){
          if(product.qty === 0) {
            this.cart.products.splice(i,1)
          }else {
            this.cart.products[i] = product
          }
          actionUpdateOk = true
        }
        i = productTotal
      }
      if(!actionUpdateOk) {
        this.cart.products.push(product)
      }
    }
    this.checkOutTotal()
  }

  checkOutTotal() {
    let total = 0
    let subtotal = 0
    this.cart.products.map((product:IProduct) => {
      subtotal += product.qty
      total += (product.qty * product.price)
    })
    this.cart.total = total
    this.cart.subtotal = subtotal
    this.setInfo()
  }

  clear(): ICart {
    this.products = []
    this.cart= {
      products: this.products,
      total: 0,
      subtotal: 0
    }
    this.setInfo()
    return this.cart
  }

  private setInfo() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this.updateItemsInCart(this.cart)
  }

  open() {
    document.getElementById("mySidenav").style.width = "600px";
    document.getElementById("overlay").style.display = "block"
    document.getElementById("mySidenav").style.overflow = "hidden";
  }

  close() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none"
    document.getElementById("mySidenav").style.overflow = "auto";
  }
}
