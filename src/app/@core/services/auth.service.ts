import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor(apollo: Apollo, private store: Store<AppState>) {
    super(apollo);
   }

  login(email:string, password:string) {
    return this.get(LOGIN_QUERY, {email, password, include:false}).pipe(
      map((result: any)=>{
        return result.login
      })
    )
  }

  // login(email:string, password:string) {
  //   return this.get(LOGIN_QUERY, {email, password}).pipe(
  //     map((res: any)=>{
  //       if(res.login.status && res.login.token) return basicAlert(TYPE_ALERT.SUCCESS, res.login.message)
  //       if(res.login.status) return basicAlert(TYPE_ALERT.WARNING, res.login.message)
  //       return basicAlert(TYPE_ALERT.ERROR, res.login.message)
  //     })
  //   )
  // }

  getMe(authorization: string) {
    const context = {
      headers: new HttpHeaders({
        authorization: authorization || ''
      })
    }
    return this.get(ME_DATA_QUERY, { include: false }, context).pipe(
      map((result: any)=>{
        return result.me
      })
    )
  }

  setSession(token:string, expiresTimeInHours = 24 ){
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeInHours)
    return {
      expiresIn: new Date(date).toISOString(),
      token
    }
  }
}
