import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  @Input() title = 'Titulo de la categoría'
  @Input() productsList: Array<IProduct> = []
  constructor() { }

  ngOnInit(): void {
  }

  addToCart($event: IProduct) {

  }

  showProductDetails($event: IProduct) {

  }

}
