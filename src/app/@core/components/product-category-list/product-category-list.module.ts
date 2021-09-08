import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemModule } from '@mugan86/ng-shop-ui';
import { ProductCategoryListComponent } from './product-category-list.component';



@NgModule({
  declarations: [ProductCategoryListComponent],
  imports: [
    CommonModule,
    ProductItemModule
  ],
  exports: [ProductCategoryListComponent]
})
export class ProductCategoryListModule { }
