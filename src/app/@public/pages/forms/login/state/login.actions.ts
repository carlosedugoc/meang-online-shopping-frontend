import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../../../@core/interfaces/user.interface';

export const setUser = createAction('[Auth] setUser',props<IUser >());
export const setToken = createAction('[Auth] setToken',props<{ token: string, expiresIn: string }>());
export const unSetUser = createAction('[Auth] unSetUser');
export const logIn = createAction('[Auth] logIn',props<{ email: string, password: string }>());
