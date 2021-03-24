import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGate, IIsec, IK } from '../../models/PaymentPrice.model';
import { UserInfoService } from './../../services/user-info.service';
import { PaymentPriceService } from './../../services/payment-price.service';

@Component({
  selector: 'v-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  subscription:Subscription;
  userInfo: any;
  userError:any;
  user:any;

  isCardGate:boolean;
  isCardIsec:boolean;
  isCardK:boolean;

  paymentPriceGate: Array<IGate>;
  paymentPriceIsec:Array<IIsec>;
  paymentPriceK: Array<IK>;

  constructor(
    private userInfoService:UserInfoService,
    private activeRoute:ActivatedRoute,
    private paymentPriceService:PaymentPriceService
  ) { 
    this.subscription = new Subscription();

    this.isCardGate = false;
    this.isCardIsec = false;
    this.isCardK = false;

    this.paymentPriceGate = [];
    this.paymentPriceK = [];
    this.paymentPriceIsec = [];

  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  getUserInfo(){
    let user = localStorage.getItem("user");
    if(user){
      this.user = JSON.parse(user);
    } 
    const routerSub = this.activeRoute.params.subscribe(params=>{
      this.handleGetPaymentPrice(params['appId']);
      const userInfoSub = this.userInfoService.getUserInfo(params['appId'], this.user.uid).subscribe(userInfoResponse=>{
        if(userInfoResponse.code === 1){
          this.userInfo = userInfoResponse.data;
        }else{
          this.userError = userInfoResponse.data;
        }
      })
      this.subscription.add(userInfoSub);
    })
    this.subscription.add(routerSub);
  }


  //handle choose card
  onClickCard(el:any){
    console.log(this.paymentPriceGate)
    const type = el.getAttribute("data-type-card");
    console.log(type);
    switch (type) {
      case 'gate':
        this.isCardGate = true;
        this.isCardIsec = false;
        this.isCardK = false;
        break;
      
      case 'isec':
        this.isCardGate = false;
        this.isCardIsec = true;
        this.isCardK = false;
        break;

      case 'k':
        this.isCardGate = false;
        this.isCardIsec = false;
        this.isCardK = true;
        break;

      default:
        break;
    }
  }

  handleGetPaymentPrice(appId:string){
    let paymentSub = this.paymentPriceService.getPaymentPrice(appId).subscribe(rs=>{
      console.log(rs)
      if(rs.code === 1){
        this.paymentPriceGate = rs.data.gate;
        this.paymentPriceIsec = rs.data.isec;
        this.paymentPriceK = rs.data.k;
      }
    })
    this.subscription.add(paymentSub);
  }


}
