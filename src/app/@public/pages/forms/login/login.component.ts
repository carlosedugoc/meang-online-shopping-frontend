import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { IResultLogin } from '@core/interfaces/login.interface';
import { basicAlert } from '@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';
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
  constructor(private auth: AuthService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.setLoginForm()
  }


  private setLoginForm (){
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  onSubmit(){
    // // this.store.dispatch(logIn( {email: this.email.value, password: this.password.value}))
    // this.auth.login(this.email.value, this.password.value).subscribe((res:IResultLogin) =>{
    //   if(res.status && res.token){
    //     basicAlert(TYPE_ALERT.SUCCESS, res.message)
    //     this.store.dispatch(setToken( this.auth.setSession(res.token)))
    //     return
    //   }
    //   if(res.status) return basicAlert(TYPE_ALERT.WARNING, res.message)
    //   return  basicAlert(TYPE_ALERT.ERROR, res.message)
    // })
    this.auth.login(this.email.value, this.password.value).subscribe(
      (result: IResultLogin) => {
        if (result.status) {
          if (result.token !== null) {
            this.auth.setSession(result.token);
            this.auth.updateSession(result);
            if (localStorage.getItem('route_after_login')) {
              const route = [localStorage.getItem('route_after_login')];
              this.router.navigate(route);
              return;
            }
            this.router.navigate(['/home']);
            return;
          }
          basicAlert(TYPE_ALERT.WARNING, result.message);
          return;
        }
        basicAlert(TYPE_ALERT.INFO, result.message);
      }
    );
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
