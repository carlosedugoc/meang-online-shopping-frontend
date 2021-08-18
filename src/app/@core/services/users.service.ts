import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { USERS_LIST } from '../../@graphql/operations/query/user';
import { IRegisterForm } from '../interfaces/register.interface';
import { REGISTER_USER } from '../../@graphql/operations/mutation/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {

  constructor(apollo:Apollo) {
    super(apollo)
   }

   getUsers() {
    return this.get(USERS_LIST, { include: true }).pipe(
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
}
