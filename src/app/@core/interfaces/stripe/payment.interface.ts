export interface IPayment {
  amount: string;
  description: string;
  customer: string;
  token?:string;
  currency:string;
}
