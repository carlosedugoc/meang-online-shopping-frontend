import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DocumentNode } from 'graphql';
import { TablePaginationService } from './table-pagination.service';
import { USERS_LIST } from '../../@graphql/operations/query/user';
import { IResultData, IInfoPage } from '../../@core/interfaces/result-data.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ITableColumns } from '../../@core/interfaces/table-columns.interface';
import { ACTIVE_FILTERS } from '@core/constants/filters';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode = USERS_LIST;
  @Input() context: object;
  @Input() itemsPage = 20;
  @Input() include = true;
  @Input() resultData: IResultData;
  @Input() tableColumns: Array<ITableColumns> = undefined;
  @Input() filterActiveValues: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE;
  @Output() manageItem = new EventEmitter<any>()
  infoPage: IInfoPage;
  data$: Observable<any>;
  constructor(private service: TablePaginationService) { }

  ngOnInit(): void {
    if(!this.query) throw new Error('Query not defined')
    if(!this.resultData) throw new Error('ResultData not defined')
    this.infoPage = {
      page:1,
      itemsPage: this.itemsPage,
      total:1,
      pages: 2
    }
    this.loadData()
  }

  loadData(){
    const variables = {
      page: this.infoPage.page,
      itemsPage:this.infoPage.itemsPage,
      include: this.include,
      active: this.filterActiveValues
    }
    this.data$ = this.service.getCollectionData(this.query, variables, {}).pipe(
      map((result:IResultData) => {
        const data = result[this.resultData.definitionKey]
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        return data[this.resultData.listKey]
      })
    )
  }

  changePage() { this.loadData() }

  manageAction(action: string, data: any) {
    this.manageItem.emit([action, data])
  }

}
