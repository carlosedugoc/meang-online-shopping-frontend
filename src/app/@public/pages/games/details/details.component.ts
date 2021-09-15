import { Component, OnInit } from '@angular/core';
import { CURRENCIES_SYMBOL, CURRENCY_LIST } from '@mugan86/ng-shop-ui';
import { ProductsService } from '@core/services/products.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { loadData, closeAlert } from '@shared/alert/alert';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product: IProduct;
  // product = products[Math.floor(Math.random() * products.length)];
  selectImage: string;
  currencySelect = CURRENCIES_SYMBOL[CURRENCY_LIST.EURO]
  screens = []
  relationalProducts: Array<Object> = []
  randomItems: Array<IProduct> = []
  loading: boolean;

  constructor(private productService: ProductsService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    debugger;
    this.activatedRoute.params.subscribe((params) => {
        loadData('Cargando Datos', 'Espera mientras carga la información')
        this.loading = true
        this.loadDataValue(+params.id)
    })
  }

  loadDataValue(id: number) {
    this.productService.getItem(id).subscribe((res) => {
        this.product = res.product
        this.selectImage = this.product.img
        this.screens = res.screens
        this.relationalProducts = res.relational
        this.randomItems = res.random
        this.loading = false
        closeAlert();
    })
  }

  changeValue(qty: number){

  }

  selectImgMain(i) {
    this.selectImage = this.screens[i]
  }


  selectOtherPlatform($event) {
    this.loadDataValue(+$event.target.value )
  }
}
