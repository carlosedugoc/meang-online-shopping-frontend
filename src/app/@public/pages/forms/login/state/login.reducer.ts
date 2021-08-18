import { createReducer, on } from '@ngrx/store';
import { Actions } from '@ngrx/store-devtools/src/reducer';
import { setUser, unSetUser, setToken, logIn } from './login.actions';
import { IUser } from '../../../../../../../../meang-backend/src/interfaces/user.interface';

export interface State {
  expiresIn: string;
  token: string;
  logedIn: boolean;
  user: IUser;
  credentials: {
    email: string;
    password: string;
  }
}

export const initialState: State = {
  expiresIn: null,
  token: null,
  logedIn: false,
  user: null,
  credentials: {
    email: null,
    password: null
  }
};

const _logInReducer = createReducer(initialState,
    on( setUser, (state, user) => ({ ...state, user: { ...user }, logedIn: true  })),
    on( unSetUser, state => ({ ...state, user: null, logedIn: false, token: null, expiresIn: null })),
    on( setToken, (state, { token, expiresIn }) => ({ ...state, token, expiresIn, loguedIn: true })),
    on( logIn, (state, { email, password }) => ({ ...state, credentials :{email, password} })),
);

export function logInReducer(state:State, action: Actions) {
    return _logInReducer(state, action);
}
