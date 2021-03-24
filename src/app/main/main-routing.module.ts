import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
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
        path:':appId',
        component:PaymentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
