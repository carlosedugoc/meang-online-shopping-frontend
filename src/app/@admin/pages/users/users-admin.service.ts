import { Injectable } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { UPDATE_USER } from '@graphql/operations/mutation/user';
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

  public block(id: string) {
    return this.set(BLOCK_USER,{id}, {}).pipe(map((result:any)=>{
      return result.blockUser
    }))
  }
}
