import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import jwtDecode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  private token: string
  private logedIn: boolean
  constructor(private router: Router){

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.logedIn){
        const dataDecoded: any = this.decodeToken(this.token)
        if(dataDecoded.exp < new Date().getTime() / 1000){
          console.log('SESIÓN CADUCADA')
          this.redirect()
          return false
        }
        if(dataDecoded.user.role === 'ADMIN') return true
        console.log('NO TIENE PERMISO')
      }
      console.log('SESION NO INICIADA')
      this.redirect()
      return false;
  }

  private decodeToken(token) { return jwtDecode(token) }

  private redirect() { this.router.navigate(['/login']) }

}
