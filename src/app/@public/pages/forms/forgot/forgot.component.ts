import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from '@core/services/password.service';
import { TYPE_ALERT } from '@shared/alert/values.config';
import { basicAlert } from '../../../../@shared/alert/toasts';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public forgotForm: FormGroup

  constructor(private fb: FormBuilder, private passwordService: PasswordService) { }

  ngOnInit(): void {
    this.setForgotForm()
  }

  private setForgotForm (){
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    })
  }

  public reset() {
    this.passwordService.reset(this.email.value).subscribe( result => {
      if(result.status) return basicAlert(TYPE_ALERT.SUCCESS, result.message)
      basicAlert(TYPE_ALERT.WARNING, result.message)
    })
  }

  get email(): AbstractControl{
    return this.forgotForm.controls.email
  }

  public isNotValid(control: string): boolean{
    return this.forgotForm.controls[control].invalid
      && (this.forgotForm.controls[control].dirty
        || this.forgotForm.controls[control].touched)
  }

}
