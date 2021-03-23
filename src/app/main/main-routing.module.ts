import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../main/views/home/home.component';
import { GuardGuard } from './../share/guard.guard';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
    canActivate:[GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
