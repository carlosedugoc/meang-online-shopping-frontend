import { ActionReducerMap } from '@ngrx/store';
import * as auth from '@shop/pages/forms/login/state/login.reducer';


export interface AppState {
   session: auth.State
}

export const appReducers: ActionReducerMap<AppState> = {
   session: auth.logInReducer,
}
