import { Component, OnInit } from '@angular/core';
import { IMeData } from '@core/interfaces/session.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StripePaymentService } from '@mugan86/stripe-payment-form';
import { take } from 'rxjs/operators';
import { CartService } from '../../../core/services/cart.service';
import { infoEventAlert, loadData } from '../../../../@shared/alert/alert';
import { CustomerService } from '../../../core/services/stripe/customer.service';
import { TYPE_ALERT } from '@shared/alert/values.config';
import { ChargeService } from '../../../core/services/stripe/charge.service';
import { IPayment } from '@core/interfaces/stripe/payment.interface';
import { CURRENCY_CODE } from '@core/constants/config';
import { ICart } from '../../../core/services/shopping-cart.interface';
import { ICharge } from '@core/interfaces/stripe/charge.interface';
import { IMail } from '@core/interfaces/mail.interface';
import { MailService } from '@core/services/mail.service';
import { IStock } from '../../../../@core/interfaces/stock.interface';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  meData: IMeData
  key = environment.stripePublicKey
  address = ''
  available = false
  block = false
  constructor(
    private router: Router,
    private stripePayment: StripePaymentService,
    private cartService: CartService,
    private customerService: CustomerService,
    private chargeService: ChargeService,
    private mailService: MailService,
    private auth: AuthService)
    {

      this.auth.accessVar$.subscribe((data: IMeData) => {
        if (!data.status) {
          // Ir a login
          this.router.navigate(['/login']);
          return;
        }
        this.meData = data;
      });
      this.cartService.itemsVar$.pipe(take(1)).subscribe((cart:ICart)=>{
        if(this.cartService.cart.total === 0 && this.available === false) {
          this.available = false
          this.notAvailableProducts()
        }
      })
      this.stripePayment.cardTokenVar$.pipe(take(1)).subscribe((token:string) => {
        if(token.indexOf('tok_') > -1 && this.meData.status && this.address){
          if(this.cartService.cart.total === 0) {
            this.available = false
            this.notAvailableProducts()
          }
          const payment: IPayment = {
            token,
            amount: this.cartService.cart.total.toString(),
            description: this.cartService.orderDescription(),
            customer: this.meData.user.stripeCustomer,
            currency: CURRENCY_CODE
          }
          const stockManage: Array<IStock> = []
          this.cartService.cart.products.map((item:IProduct) => {
            stockManage.push({
              id: +item.id,
              increment: item.qty * (-1)
            })
          })
          this.block = true
          loadData('Realizando el pago', 'Espere mientras se procesa la información de pago')
          this.chargeService.pay(payment, stockManage).pipe(take(1)).subscribe(async(result:{
            status: boolean,
            message: string,
            charge: ICharge
          }) => {
            if(result.status){
              await infoEventAlert('Pedido realizado correctamente', 'Has efectuado correctamente el pedido', TYPE_ALERT.SUCCESS)
              this.sendEmail(result.charge)
              this.router.navigate(['/orders'])
              this.cartService.clear()
              return
            }else {
              await infoEventAlert('Pedido NO se ha realizado', 'El pedido no se ha completado, intentalo de nuevo')
            }
            this.block = false
          })
        }
      })
    }

  async notAvailableProducts() {
    this.cartService.close()
    this.available = false
    await infoEventAlert('Accion no disponible', 'No se puede realizar pago sin productos')
    this.router.navigate(['/'])
  }

  sendEmail(charge: ICharge) {
    const mail: IMail = {
      to: charge.receiptEmail,
      subject: 'Confirmación del pedido',
      html: `
      El pedido se ha realizado correctamente.
      Puedes consultarlo en <a href="${charge.receiptUrl}" target="_blank">esta url</a>
      `
    };
    this.mailService.send(mail).pipe(take(1)).subscribe();
  }

  ngOnInit(): void {
    if(localStorage.getItem('address')) {
      this.address = localStorage.getItem('address')
      localStorage.removeItem('address')
    }
    this.cartService.initialize()
    localStorage.removeItem('route_after_login')
    this.block = false
    if(this.cartService.cart.total === 0) {
      this.available = false
      this.notAvailableProducts()
    }else {
      this.available = true
    }
  }

  async sendData() {
    if(!this.meData.user.stripeCustomer) {
      await infoEventAlert('Cliente no existe', 'Necesitamos un cliente para realizar el pago')
      const stripeName = `${this.meData.user.name} ${this.meData.user.lastname}`
      loadData('Procesando la información', 'Creando el cliente...')
      this.customerService.add(
        stripeName, this.meData.user.email)
        .pipe(take(1))
        .subscribe(async (res: {status: Boolean, message: string})=>{
          if(res.status) {
            await infoEventAlert('Cliente añadido', 'reiniciar la sesión', TYPE_ALERT.SUCCESS)
            localStorage.setItem('address', this.address)
            localStorage.setItem('route_after_login', this.router.url)
          }else {
            await infoEventAlert('Cliente no añadido', res.message, TYPE_ALERT.WARNING)
          }
      })
      return
    }
    this.stripePayment.takeCardToken(true)
  }

}
