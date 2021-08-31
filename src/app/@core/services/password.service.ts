import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CHANGE_PASSWORD, RESET_PASSWORD } from '@graphql/operations/mutation/password';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo)
   }

   public reset(email: string) {
    return this.set(RESET_PASSWORD, {email}).pipe(
      map((res:any)=>{
        return res.resetPassword
      })
    )
   }

   public change(token: string, password: string) {
    const {id} = JSON.parse(atob(token.split('.')[1])).user;
    return this.set(CHANGE_PASSWORD, {id, password}, {
      headers: new HttpHeaders({
        Authorization: token
      })
    }).pipe(
      map((res:any)=>{
        return res.changePassword
      })
    )
  }
}
