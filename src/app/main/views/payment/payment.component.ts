import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGate, IIsec, IK } from '../../models/PaymentPrice.model';
import { UserInfoService } from './../../services/user-info.service';
import { PaymentPriceService } from './../../services/payment-price.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


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

  paymentGateForm!: FormGroup;
  paymentIsecForm!: FormGroup;
  paymentKForm!: FormGroup;

  //validator
  isSeriGateEmpty:boolean;
  isPinGateEmpty:boolean;

  isPinIsecEmpty:boolean;

  isPinKEmpty:boolean;

  constructor(
    private userInfoService:UserInfoService,
    private activeRoute:ActivatedRoute,
    private paymentPriceService:PaymentPriceService,
    private fb:FormBuilder
  ) { 
    this.subscription = new Subscription();

    this.isCardGate = true;
    this.isCardIsec = false;
    this.isCardK = false;

    this.paymentPriceGate = [];
    this.paymentPriceK = [];
    this.paymentPriceIsec = [];

    this.isSeriGateEmpty = false;
    this.isPinGateEmpty = false;

    this.isPinIsecEmpty = false;
    
    this.isPinKEmpty = false;
  }

  ngOnInit(): void {
    this.createForm();
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
    const type = el.getAttribute("data-type-card");
    this.setHideError();
    switch (type) {
      case 'gate':
        this.isCardGate = true;
        this.isCardIsec = false;
        this.isCardK = false;

        this.paymentGateForm.controls['seriGate'].setValue(null);
        this.paymentGateForm.controls['pinGate'].setValue(null);

        break;
      
      case 'isec':
        this.isCardGate = false;
        this.isCardIsec = true;
        this.isCardK = false;

        this.paymentIsecForm.controls['pinIsec'].setValue(null);

        break;

      case 'k':
        this.isCardGate = false;
        this.isCardIsec = false;
        this.isCardK = true;
        
        this.paymentKForm.controls['pinK'].setValue(null);

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


  //create new form
  createForm(){
    this.paymentGateForm = this.fb.group({
      seriGate:[null,[Validators.required]],
      pinGate:[null,[Validators.required]]
    })

    this.paymentIsecForm = this.fb.group({
      pinIsec:[null,[Validators.required]]
    })

    this.paymentKForm = this.fb.group({
      pinK:[null,[Validators.required]]
    })
  }


  //handle form gate
  handleSubmitFormGate(){
    if (this.paymentGateForm.controls['seriGate'].value == null || this.paymentGateForm.controls['seriGate'].value == ''){
      this.isSeriGateEmpty = true;
    }

    if (this.paymentGateForm.controls['pinGate'].value == null || this.paymentGateForm.controls['pinGate'].value == ''){
      this.isPinGateEmpty = true;
    }
  }

  onClickInputSeriGate(){
    this.isSeriGateEmpty = false;
  }

  onClickInputPinGate() {
    this.isPinGateEmpty = false;
  }

  //handle form isec
  handleSubmitFormIsec(){
    if (this.paymentIsecForm.controls['pinIsec'].value == null || this.paymentIsecForm.controls['pinIsec'].value == ''){
      this.isPinIsecEmpty = true;
    }
  }

  onClickInputPinIsec(){
    this.isPinIsecEmpty = false;
  }


  //handle form K
  handleSubmitFormK() {
    if (this.paymentKForm.controls['pinK'].value == null || this.paymentIsecForm.controls['pinK'].value == '') {
      this.isPinKEmpty = true;
    }
  }

  onClickInputPinK() {
    this.isPinKEmpty = false;
  }

  //set hide error
  setHideError(){
    this.isPinIsecEmpty = false;
    this.isPinGateEmpty = false;
    this.isSeriGateEmpty = false;
    this.isPinKEmpty = false;
  }
}
