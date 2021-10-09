import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { LOGIN_QUERY, ME_DATA_QUERY } from '@graphql/operations/query/user';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ISession } from '@core/interfaces/session.interface';
import { Subject } from 'rxjs';
import { IMeData } from '../interfaces/session.interface';
import  jwtDecode from 'jwt-decode';
import { optionsWithDetails } from '@shared/alert/alert';
import { REDIRECT_ROUTES } from '@core/constants/config';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  accessVar = new Subject<IMeData>();
  accessVar$ = this.accessVar.asObservable();


  constructor(apollo: Apollo, private store: Store<AppState>) {
    super(apollo);
   }


  updateSession(newValue: IMeData) {
    this.accessVar.next(newValue);
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

  // getMe(authorization: string) {
  //   const context = {
  //     headers: new HttpHeaders({
  //       authorization: authorization || ''
  //     })
  //   }
  //   return this.get(ME_DATA_QUERY, { include: false }, context).pipe(
  //     map((result: any)=>{
  //       return result.me
  //     })
  //   )
  // }

  // setSession(token:string, expiresTimeInHours = 24 ){
  //   const date = new Date();
  //   date.setHours(date.getHours() + expiresTimeInHours)
  //   return {
  //     expiresIn: new Date(date).toISOString(),
  //     token
  //   }
  // }

  setSession(token: string, expiresTimeInHours = 24) {
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeInHours);

    const session: ISession = {
      expiresIn: new Date(date).toISOString(),
      token
    };
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): ISession {
    return (localStorage.getItem('session') !== null) ?
        JSON.parse(localStorage.getItem('session')) : {
          expiresIn: '',
          token: ''
        };
  }

  getMe() {
    return this.get(ME_DATA_QUERY, {
      include: false
    },
    {
      headers: new HttpHeaders({
        Authorization: (this.getSession() as ISession).token
      })
    }).pipe(map((result: any) => {
      return result.me;
    }));
  }

  start() {
    const dataDecode: any = this.decodeToken();
    // COmprobar que no está caducado el token
    if (dataDecode.exp < new Date().getTime() / 1000) {
      console.log('Sesión caducada');
      localStorage.removeItem('session');
      return;
    }
    if (this.getSession() !== null) {
      this.getMe().subscribe((result: IMeData) => {
        if (!result.status) {
          this.resetSession();
          return;
        }
        this.updateSession(result);
      });
      console.log('Sesión iniciada');
      return;
    }
    this.updateSession({
      status: false
    });
    console.log('Sesión no iniciada');
  }

  async resetSession(routesUrl: string = '') {
    const result = await optionsWithDetails(
      'Cerrar sesión',
      `¿Estás seguro que quieres cerrar la sesión?`,
      400,
      'Si, cerrar', // true
      'No'
    ); // false
    if (!result) {
      return;
    }
    // rutas que usaremos para redireccionar
    if (REDIRECT_ROUTES.includes(routesUrl)) {
      // En el caso de encontrarla marcamos para que redireccione
      localStorage.setItem('route_after_login', routesUrl);
    }
    localStorage.removeItem('session');
    this.updateSession({status: false});
  }

  decodeToken() {
    return (this.getSession().token !== '') ? jwtDecode(this.getSession().token) : '';
  }
}
