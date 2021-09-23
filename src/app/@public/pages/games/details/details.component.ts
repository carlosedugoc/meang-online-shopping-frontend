import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@core/services/products.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { loadData, closeAlert } from '@shared/alert/alert';
import { CURRENCY_SELECT } from '@core/constants/config';
import { CartService } from '@shop/core/services/cart.service';
import { ICart } from '../../../core/services/shopping-cart.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product: IProduct;
  // product = products[Math.floor(Math.random() * products.length)];
  selectImage: string;
  currencySelect = CURRENCY_SELECT
  screens = []
  relationalProducts: Array<Object> = []
  randomItems: Array<IProduct> = []
  loading: boolean;

  constructor(private productService: ProductsService, private activatedRoute: ActivatedRoute, private cartService: CartService ) { }

  ngOnInit(): void {
    debugger;
    this.activatedRoute.params.subscribe((params) => {
        loadData('Cargando Datos', 'Espera mientras carga la información')
        this.loading = true
        this.loadDataValue(+params.id)
    })

    this.cartService.itemsVar$.subscribe((data:ICart)=>{
       if(data.subtotal === 0){
         this.product.qty = 1
         return
       }
       this.product.qty = this.findProduct(+this.product.id).qty;
    })
  }

  findProduct(id:number) {
    return this.cartService.cart.products.find(item => +item.id === id );
  }

  loadDataValue(id: number) {
    this.productService.getItem(id).subscribe((res) => {
        this.product = res.product
        const saveProductInCart = this.findProduct(+this.product.id);
        this.product.qty = (saveProductInCart) ? saveProductInCart.qty : this.product.qty
        this.selectImage = this.product.img
        this.screens = res.screens
        this.relationalProducts = res.relational
        this.randomItems = res.random
        this.loading = false
        closeAlert();
    })
  }

  changeValue(qty: number){
    this.product.qty = qty
  }

  selectImgMain(i) {
    this.selectImage = this.screens[i]
  }


  selectOtherPlatform($event) {
    this.loadDataValue(+$event.target.value )
  }

  addToCart() {
    this.cartService.manageProduct(this.product)
  }
}
