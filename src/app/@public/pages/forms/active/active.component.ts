import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { basicAlert } from '@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';
import { UsersService } from '../../../../@core/services/users.service';

class MyValidations {
  static matchPassword(control:AbstractControl) {
    const password = control.get('password').value
    const confirmPassword = control.get('confirmPassword').value
    if (password === confirmPassword) return null
    return {match_password: true}
  }
}

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  public token: string
  public activeForm: FormGroup

  constructor(
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private userService: UsersService,
    private router:Router
    ) {
    this.route.params.subscribe( params => {
      console.log(params.token)
      this.token = params.token
    })
  }

  private setActiveForm (){
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18)
    this.activeForm = this.fb.group({
        birthday: [date, Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      },{
        validators: MyValidations.matchPassword
      }
    )
  }

  dataAssign($event) {
    const birthday = `${$event.year}-${$event.month.toString().padStart(2,'0')}-${$event.day.toString().padStart(2,'0')}`
    this.activeForm.controls['birthday'].setValue(birthday)
  }

  add (){
    this.userService.active(this.token, this.birthday.value, this.password.value).subscribe(result =>{
      console.log(result)
      if(result.status){
        basicAlert(TYPE_ALERT.SUCCESS, result.message)
        this.router.navigate(['login'])
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, result.message)
    })
  }

  ngOnInit(): void {
    this.setActiveForm()
  }

  public isNotValid(control: string): boolean{
    return this.activeForm.controls[control].invalid
      && (this.activeForm.controls[control].dirty
        || this.activeForm.controls[control].touched)
  }

  get password(): AbstractControl {
    return this.activeForm.controls.password
  }

  get confirmPassword(): AbstractControl {
    return this.activeForm.controls.confirmPassword
  }

  get birthday(): AbstractControl {
    return this.activeForm.controls.birthday
  }

}
