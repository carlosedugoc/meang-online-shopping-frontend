import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { USERS_LIST } from '../../@graphql/operations/query/user';
import { IRegisterForm } from '../interfaces/register.interface';
import { ACTIVE_USER, REGISTER_USER } from '../../@graphql/operations/mutation/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  constructor(apollo:Apollo) {
    super(apollo)
   }

   getUsers(page:number =1, itemsPage:number=20) {
    return this.get(USERS_LIST, { include: true, page, itemsPage }).pipe(
      map((result: any)=>{
        return result.users
      })
    )
  }

  register(user: IRegisterForm) {
    return this.set(REGISTER_USER, {user, include:false}).pipe(
      map((res:any)=>{
        return res.register
      })
    )
  }

  active(token: string, birthday: string, password: string) {
    const {id} = JSON.parse(atob(token.split('.')[1])).user;
    return this.set(ACTIVE_USER, {id, password, birthday}, {
      headers: new HttpHeaders({
        Authorization: token
      })
    }).pipe(
      map((res:any)=>{
        return res.activeUserAction
      })
    )
  }
}
