import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { IResultLogin } from '@core/interfaces/login.interface';
import { basicAlert } from '@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';
import { Store } from '@ngrx/store';
import { AppState } from '@main/app.reducer';
import { setToken } from './state/login.actions';
import { ISession } from '../../../../@core/interfaces/session.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  private session: ISession
  constructor(private auth: AuthService, private fb: FormBuilder, private store: Store<AppState>, private router:Router) { }

  ngOnInit(): void {
    this.setLoginForm()
    this.store.select('session').subscribe(res => {
      const route = localStorage.getItem('route_after_login')
      if(route) {
        this.router.navigate([route])
        localStorage.removeItem('route_after_login')
        return
      }
      if (res.logedIn) this.router.navigate(['/home'])
    })
  }

  private setLoginForm (){
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  onSubmit(){
    // this.store.dispatch(logIn( {email: this.email.value, password: this.password.value}))
    this.auth.login(this.email.value, this.password.value).subscribe((res:IResultLogin) =>{
      if(res.status && res.token){
        basicAlert(TYPE_ALERT.SUCCESS, res.message)
        this.store.dispatch(setToken( this.auth.setSession(res.token)))
        return
      }
      if(res.status) return basicAlert(TYPE_ALERT.WARNING, res.message)
      return  basicAlert(TYPE_ALERT.ERROR, res.message)
    })
  }

  public isNotValid(control: string): boolean{
    return this.loginForm.controls[control].invalid
      && (this.loginForm.controls[control].dirty
        || this.loginForm.controls[control].touched)
  }

  //GETTERS
  get email(): AbstractControl{
    return this.loginForm.controls.email
  }

  get password(): AbstractControl {
    return this.loginForm.controls.password
  }

}
