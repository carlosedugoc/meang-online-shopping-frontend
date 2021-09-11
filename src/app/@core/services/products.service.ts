import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { SHOP_LAST_UNIT_OFFERS } from '@graphql/operations/query/shop-product';
import { map } from 'rxjs/operators';
import { SHOP_PRODUCT_BY_PLATFORM } from '../../@graphql/operations/query/shop-product';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { HOME_PAGE } from '../../@graphql/operations/query/home-page';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo)
   }

   getHomePage() {
     return this.get(HOME_PAGE,{showPlatform: true}).pipe(
       map((result: any) =>{
         return {
           carousel: result.carousel,
           ps4: this.manageInfo(result.ps4.shopProducts, false),
           pc: this.manageInfo(result.pc.shopProducts, false),
           topPrice: this.manageInfo(result.topPrice35.shopProducts, true)
         }
       })
     )
   }

   getByPlatform(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    platform: Array<string>,
    showInfo: boolean = false,
    showPlatform: boolean = false
  ) {
    return this.get(SHOP_PRODUCT_BY_PLATFORM,{page, itemsPage, active, random, platform, showInfo, showPlatform}).pipe(
      map((result:any) => {
        const data = result.shopProductsPlatform
        return {
          info: data.info,
          result: this.manageInfo(data.shopProducts)
        }
      })
    )
  }

   getByLastUnitsOffers(
     page: number = 1,
     itemsPage: number = 10,
     active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
     random: boolean = false,
     topPrice: number = -1,
     lastunits: number = -1,
     showInfo: boolean = false,
     showPlatform: boolean = false
   ) {
     return this.get(SHOP_LAST_UNIT_OFFERS,{page, itemsPage, active, random, topPrice, lastunits, showInfo, showPlatform}).pipe(
       map((result:any) => {
         const data = result.shopProductsOffersLast
        return {
          info: data.info,
          result: this.manageInfo(data.shopProducts)
        }
       })
     )
   }

   private manageInfo(productsList, showDescription = true) {
    const resultList: Array<IProduct> = []
    productsList.map((shopObject) => {
      resultList.push({
        id: shopObject.id,
        img: shopObject.product.img,
        name: shopObject.product.name,
        rating: shopObject.product.rating,
        description: (shopObject.platform && showDescription) ? shopObject.platform.name : '',
        qty: 1,
        price: shopObject.price,
        stock: shopObject.stock
      })
    })
    return resultList
   }


}
