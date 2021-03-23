import { NgModule, CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from "ngx-spinner";

import { LoginRegisterComponent } from './views/login-register/login-register.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [LoginRegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:650,
      positionClass:'toast-top-center',
      preventDuplicates:true
    })
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA  ]
})
export class AuthModule { }
