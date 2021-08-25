import { Component, OnInit } from '@angular/core';
import { IResultData } from '../../../@core/interfaces/result-data.interface';
import { DocumentNode } from 'graphql';
import { GENRES_LIST } from '@graphql/operations/query/genre';
import { ITableColumns } from '../../../@core/interfaces/table-columns.interface';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  public query: DocumentNode = GENRES_LIST;
  public context: object;
  public itemsPage: number;
  public resultData: IResultData;
  public columns: Array<ITableColumns> = undefined;

  constructor() { }

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10;
    this.resultData = { listKey: 'genres', definitionKey: 'genres' };
    this.columns = [
      {property: 'id', label: '#'},
      {property: 'name', label: 'Nombre del género'},
      {property: 'slug', label: 'slug'},
    ]
  }

}
