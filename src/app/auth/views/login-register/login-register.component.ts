import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'v-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  loginForm!:FormGroup;

  //valid form
  isValidEmailError:boolean;
  isEmailEmpty:boolean;

  isValidPasswordError:boolean;
  isPasswordEmpy:boolean;
  isPassAndEmaildNotCorrect:boolean;

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private spinnerService:NgxSpinnerService,
    private toastr:ToastrService,
    private router:Router
  ) { 
    this.isValidEmailError = false;
    this.isEmailEmpty = false;

    this.isValidPasswordError = false;
    this.isPasswordEmpy = false;
    this.isPassAndEmaildNotCorrect = false;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:[null,[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ],
      password:[null,[
        Validators.required,
        Validators.pattern("^.{8,}$")
      ]
    ]
    })
  }

  onSubmit(){
    if(this.loginForm.controls['email'].value == null){
      this.isEmailEmpty = true;
    }else{
      if (!this.loginForm.controls['email'].valid) {
        this.isValidEmailError = true;
      }else{
        this.isValidEmailError = false;
      }
    }

    if(this.loginForm.controls['password'].value == null){
      this.isPasswordEmpy = true;
    }else{
      if(!this.loginForm.controls['password'].valid){
        this.isValidPasswordError = true;
      }else{
        this.isValidPasswordError = false;
      }
    }

    if(this.loginForm.valid){
      this.spinnerService.show();
      this.authService.login(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value)
      .then(rs=>{
        if(rs.user){
          this.toastr.success('Đăng nhập thành công');
          localStorage.setItem("user",JSON.stringify(rs.user));
          this.spinnerService.hide();
          this.router.navigateByUrl('/');
        }
      })
      .catch(error=>{
        this.authService.signUp(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value)
        .then(rs=>{
          this.toastr.success('Đăng ký thành công');
          this.spinnerService.hide();
        })
        .catch(error=>{
            this.toastr.error("Đăng ký / Đăng nhập thất bại");
          this.isPassAndEmaildNotCorrect = true;
          this.spinnerService.hide();
        })
      })
    }
  }

  loginWithinGoogle(){
    this.spinnerService.show();
    this.authService.loginWithGoogle()
    .then(rs=>{
      this.toastr.success('Đăng nhập thành công');
      localStorage.setItem("user",JSON.stringify(rs.user));
      this.spinnerService.hide();
      this.router.navigateByUrl('/');
    })
    .catch(error=>{
      this.toastr.error('Đăng nhập thất bại');
      this.spinnerService.hide();
    })
  }


  loginWithinFacebook() {
    this.authService.loginWithFacebook()
      .then(rs => {
        this.toastr.success('Đăng nhập thành công');
        localStorage.setItem("user", JSON.stringify(rs.user));
        this.spinnerService.hide();
        this.router.navigateByUrl('/');
      })
      .catch(error => {
        this.toastr.error('Đăng nhập thất bại');
        this.spinnerService.hide();
      })
  }

  loginWithinApple() {
    this.authService.loginWithApple()
      .then(rs => {
        this.toastr.success('Đăng nhập thành công');
        localStorage.setItem("user", JSON.stringify(rs.user));
        this.spinnerService.hide();
        this.router.navigateByUrl('/');
      })
      .catch(error => {
        this.toastr.error('Đăng nhập thất bại');
        this.spinnerService.hide();
      })
  }

  onEmailFocus(){
    this.isPassAndEmaildNotCorrect = false;
    this.isValidEmailError = false;
    this.isEmailEmpty = false;
  }

  onPasswordFocus(){
    this.isPassAndEmaildNotCorrect = false;
    this.isValidPasswordError = false;
    this.isPasswordEmpy = false;
  }
}
