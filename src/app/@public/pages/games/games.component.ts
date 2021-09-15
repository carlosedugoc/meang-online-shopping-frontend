import { Component, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { ProductsService } from '@core/services/products.service';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { IGamePageInfo } from './games-page-info.interface';
import { ActivatedRoute } from '@angular/router';
import { GAMES_PAGES_INFO, TYPE_OPERATION } from './game.constants';
import { loadData, closeAlert } from '../../../@shared/alert/alert';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public infoPage = {
    page: 1,
    pages: 8,
    total: 160,
    itemsPage: 20
  }
  public productsList: Array<IProduct> = []
  public selectPage;
  public gamesPageInfo: IGamePageInfo
  private typeData: TYPE_OPERATION
  public loading: boolean

  constructor(private products: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loading = true
      loadData('Cargando Datos', 'Espera mientras carga la información')
      this.gamesPageInfo = GAMES_PAGES_INFO[`${params.type}/${params.filter}`]
      this.typeData = params.type
      this.selectPage = 1
      this.loadData();
    })
  }

  loadData() {
    if (this.typeData === TYPE_OPERATION.PLATFORMS){
      this.products.getByPlatform(
        this.selectPage, this.infoPage.itemsPage,
        ACTIVE_FILTERS.ACTIVE, false,
        this.gamesPageInfo.platformsIds,
        true, true).subscribe((data) => this.asignResult(data))
      return
    }

    this.products.getByLastUnitsOffers(
      this.selectPage, this.infoPage.itemsPage,
        ACTIVE_FILTERS.ACTIVE, false,
        this.gamesPageInfo.topPrice, this.gamesPageInfo.stock,
        true, true).subscribe((data) => this.asignResult(data))
  }

  asignResult(data) {
    this.productsList = data.result
    this.infoPage = data.info;
    closeAlert()
    this.loading = false
  }





}
