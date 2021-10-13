import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from "rxjs/operators";
import { DocumentNode } from 'graphql';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { REGISTER_USER } from '../operations/mutation/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  protected get(query: DocumentNode, variables: object = {}, context: object = {}, cache: boolean = true){
    return this.apollo.watchQuery({
      query,
      variables,
      context,
      fetchPolicy: (cache) ? 'network-only' : 'no-cache'
    }).valueChanges.pipe(map(({data}) => data))
  }

  protected set(mutation: DocumentNode, variables: object = {}, context: object = {}){
    return this.apollo.mutate({
      mutation,
      variables,
      context
    }).pipe(map((result) => result.data))
  }

  protected subscription(subscription: DocumentNode, variables: object = {}, context: object = {}){
    return this.apollo.subscribe({
      query: subscription,
      variables
    }).pipe(map((result) => result.data))
  }

}
