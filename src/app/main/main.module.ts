import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
