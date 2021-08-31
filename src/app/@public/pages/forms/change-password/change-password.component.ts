import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { basicAlert } from '@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';
import { PasswordService } from '../../../../@core/services/password.service';

class MyValidations {
  static matchPassword(control:AbstractControl) {
    const password = control.get('password').value
    const confirmPassword = control.get('confirmPassword').value
    if (password === confirmPassword) return null
    return {match_password: true}
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public token: string
  public resetForm: FormGroup

  constructor(
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private router:Router
    ){ }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log(params.token)
      this.token = params.token
    })
    this.setResetForm()
  }

  private setResetForm (){
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18)
    this.resetForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      },{
        validators: MyValidations.matchPassword
      }
    )
  }
  public reset() {
    this.passwordService.change(this.token, this.password.value).subscribe(result => {
      if(result.status) {
        basicAlert(TYPE_ALERT.SUCCESS, result.message)
        this.router.navigate(['login'])
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, result.message)
    })
  }

  get password(): AbstractControl {
    return this.resetForm.controls.password
  }

  get confirmPassword(): AbstractControl {
    return this.resetForm.controls.confirmPassword
  }

  public isNotValid(control: string): boolean{
    return this.resetForm.controls[control].invalid
      && (this.resetForm.controls[control].dirty
        || this.resetForm.controls[control].touched)
  }

}
