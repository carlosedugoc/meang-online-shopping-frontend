import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AppState } from '@main/app.reducer';
import { AuthService } from '@core/services/auth.service';
import { IMeData } from '@core/interfaces/session.interface';
import { unSetUser, setUser } from './forms/login/state/login.actions';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private store: Store<AppState>, private auth: AuthService) { }

  ngOnInit(): void {
    this.init()
  }

  private init(){
    this.store.select('session').pipe(
      switchMap(resultStore => {
        const {token, user} = resultStore
        if(token && !user) return this.auth.getMe(token)
        else return EMPTY
      })
    ).subscribe((res:IMeData) =>{
      if(!res.status) return this.store.dispatch(unSetUser())
      this.store.dispatch(setUser(res.user))
    })
  }

}
