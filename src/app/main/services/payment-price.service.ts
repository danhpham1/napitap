import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPaymentResponse } from './../models/PaymentPrice.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentPriceService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getPaymentPrice(appId:string){
    return this.httpClient.get<IPaymentResponse>(`${environment.Host}${environment.APIPrefix}${environment.APIVersion}${appId}/${environment.APIPaymentPrice}`);
  }
}
