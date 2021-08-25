import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { DocumentNode } from 'graphql';
import { USERS_LIST } from '@graphql/operations/query/user';
import { ITableColumns } from '@core/interfaces/table-columns.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public query: DocumentNode = USERS_LIST;
  public context: object = {};
  public itemsPage: number = 10;
  public resultData: IResultData = { listKey: 'users', definitionKey: 'users' };
  public include: boolean = true
  public columns: Array<ITableColumns> = [
    {property: 'id', label: '#'},
    {property: 'name', label: 'Nombre'},
    {property: 'lastname', label: 'Apellido'},
    {property: 'email', label: 'Correo'},
    {property: 'role', label: 'Permisos'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
