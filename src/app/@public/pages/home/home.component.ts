import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import carouselItems from '@data/carousel.json';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ProductsService } from '@core/services/products.service';
import { ACTIVE_FILTERS } from '@core/constants/filters';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public items: ICarouselItem[] = [];
  public productsList
  public listOne;
  public listTwo;
  public listThree;


  constructor( private auth:AuthService, private products:ProductsService) { }

  ngOnInit(): void {
    this.products.getByLastUnitsOffers(1,4,ACTIVE_FILTERS.ACTIVE, true,40).subscribe(res =>{
      console.log('Productos a menos de 40',res)
      this.listTwo = res
    })

    this.products.getByPlatform(1,4,ACTIVE_FILTERS.ACTIVE, true,'18').subscribe(res =>{
      console.log('Productos PS 4',res)
      this.listOne = res
    })

    this.products.getByPlatform(1,4,ACTIVE_FILTERS.ACTIVE, true,'4').subscribe(res =>{
      console.log('Productos PS 4',res)
      this.listThree = res
    })

    this.products.getByLastUnitsOffers(1,6,ACTIVE_FILTERS.ACTIVE, true,-1, 20).subscribe((res:IProduct[]) =>{
      console.log('ojos',res)
      res.map((item:IProduct)=>{
        this.items.push( {
          id: item.id,
          title: item.name,
          description: item.description,
          background:item.img,
          url: ''
        })
      })
      console.log('items', this.items)
    })

    //this.items = carouselItems
    // this.productsList = productsList
    // console.log('carouseItems', this.items)

    // this.usersService.getUsers().subscribe(res=>{
    //   console.log(res)
    // })
    // this.listOne = this.fakeRandomProductList()
    // this.listTwo = this.fakeRandomProductList()
    // this.listThree = this.fakeRandomProductList()
  }

  addToCart($event: IProduct) {

  }

  showProductDetails($event: IProduct) {

  }

  fakeRandomProductList() {
    const list = []
    const arrayMax = 4
    const limit = this.productsList.length;
    for (let i = 0; i < arrayMax; i++) {
      list.push(this.productsList[Math.ceil(Math.random() * limit)])
    }
    return list
  }


}
