import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRegisterComponent } from './auth/views/login-register/login-register.component';

import { GuardGuard } from './share/guard.guard';
import { AppComponent } from './app.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full',
    canActivate: [GuardGuard],
  },
  {
    path:'login',
    component:LoginRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
