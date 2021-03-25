import { GiftcodeProcessComponent } from './components/Gift-Code/giftcode-process/giftcode-process.component';
import { GiftcodeHomeComponent } from './components/Gift-Code/giftcode-home/giftcode-home.component';
import { GiftcodeComponent } from './views/giftcode/giftcode.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { HomeComponent } from '../main/views/home/home.component';
import { GuardGuard } from './../share/guard.guard';
import { PaymentComponent } from './views/payment/payment.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    canActivate:[GuardGuard],
    children:[
      {
        path:'home',
        component: MainComponent
      },
      {
        path:'giftcode',
        component:GiftcodeComponent,
        children:[
          {
            path:'',
            component: GiftcodeHomeComponent
          },
          {
            path:':appId',
            component:GiftcodeProcessComponent
          }
        ]
      },
      {
        path:':appId',
        component:PaymentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
