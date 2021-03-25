import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './views/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameComponent } from './components/game/game.component';
import { PaymentComponent } from './views/payment/payment.component';
import { GiftcodeComponent } from './views/giftcode/giftcode.component';
import { GiftcodeHomeComponent } from './components/Gift-Code/giftcode-home/giftcode-home.component';
import { GiftcodeProcessComponent } from './components/Gift-Code/giftcode-process/giftcode-process.component';


@NgModule({
  declarations: [HomeComponent, HeaderComponent, MainComponent, FooterComponent, GameComponent, PaymentComponent, GiftcodeComponent, GiftcodeHomeComponent, GiftcodeProcessComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
