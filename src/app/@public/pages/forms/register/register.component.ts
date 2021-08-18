import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../@graphql/services/api.service';
import { IRegisterForm, IResultRegister } from '../../../../@core/interfaces/register.interface';
import { REGISTER_USER } from '../../../../@graphql/operations/mutation/user';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from '../../../../@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { setUser } from '../login/state/login.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private api: UsersService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.setRegisterForm()
  }

  public dataAssigned($event: NgbDateStruct){
    const birthday = `${$event.year}-${$event.month.toString().padStart(2,'0')}-${$event.day.toString().padStart(2,'0')}`
    this.registerForm.controls['birthday'].setValue(birthday)
  }

  private setRegisterForm (){
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  public onSubmit(){
    console.log(this.registerForm.value)
    this.api.register(this.registerForm.value as IRegisterForm).subscribe((res:IResultRegister) =>{
      if(!res.status) return basicAlert(TYPE_ALERT.WARNING, res.message)
      this.store.dispatch(setUser(res.user))
      basicAlert(TYPE_ALERT.SUCCESS, res.message)
      this.router.navigate(['/login'])
    })
  }

  public isNotValid(control: string): boolean{
    return this.registerForm.controls[control].invalid
      && (this.registerForm.controls[control].dirty
        || this.registerForm.controls[control].touched)
  }


    //GETTERS
    get name(): AbstractControl{
      return this.registerForm.controls.name
    }

    get lastname(): AbstractControl{
      return this.registerForm.controls.lastname
    }

    get birthday(): AbstractControl{
      return this.registerForm.controls.birthday
    }

    get email(): AbstractControl{
      return this.registerForm.controls.email
    }

    get password(): AbstractControl {
      return this.registerForm.controls.password
    }

}
