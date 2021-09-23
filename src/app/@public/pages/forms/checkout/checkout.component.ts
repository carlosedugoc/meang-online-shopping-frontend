import { Component, OnInit } from '@angular/core';
import { IMeData } from '@core/interfaces/session.interface';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  meData: IMeData

  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select('session').subscribe(res => {
      if (!res.logedIn) return this.router.navigate(['/login'])
      this.meData = {status: true, message: 'Ok', user: res.user }
    })
  }

  ngOnInit(): void {
  }

}
