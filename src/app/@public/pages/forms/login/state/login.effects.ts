import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { logIn, setToken } from './login.actions';
import { AuthService } from '../../../../../@core/services/auth.service';
import { AppState } from "@main/app.reducer";
import { Store } from "@ngrx/store";


@Injectable()
export class LogInEffects {
  constructor(private actions$: Actions, private auth: AuthService, private store: Store<AppState>) {}

  logIn$ = createEffect(
    () => this.actions$.pipe(
      ofType(logIn),
      mergeMap((action)=>this.auth.login(action.email, action.password).pipe(
        map((cred: any) => setToken({token: cred.token, expiresIn: cred.expiresIn}))
      ))
    )
  )

}
