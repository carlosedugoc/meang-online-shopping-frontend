import { Injectable } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { ACTIVE_EMAIL_USER, UPDATE_USER } from '@graphql/operations/mutation/user';
import { map } from 'rxjs/operators';
import { BLOCK_GENRE } from '../../../@graphql/operations/mutation/genre';
import { BLOCK_USER } from '../../../@graphql/operations/mutation/user';

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService extends ApiService {

  constructor(private userService: UsersService, apollo: Apollo ) {
    super(apollo)
   }

  register(user:IRegisterForm) {
    return this.userService.register(user)
  }

  update(user:IRegisterForm) {
    return this.set(UPDATE_USER,{user, include:false},{}).pipe(
      map((result:any)=> {
        return result.updateUser
      })
    )
  }

  public unblock(id: string, unblock: boolean =false, admin: boolean =false) {
    return this.set(BLOCK_USER,{id, unblock, admin}, {}).pipe(map((result:any)=>{
      return result.blockUser
    }))
  }

  public sendEmailActive(id: string, email: string) {
    return this.set(ACTIVE_EMAIL_USER,{id, email}, {}).pipe(map((result:any)=>{
      return result.activeUserEmail
    }))
  }
}
