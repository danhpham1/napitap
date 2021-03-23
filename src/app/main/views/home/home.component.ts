import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'v-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any;
  
  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    if(this.user){
      this.user = JSON.parse(this.user);
      console.log(this.user);
    }
  }

  logout(){
    this.authService.logout()
    .then(rs=>{
      localStorage.removeItem("user");
      this.toastrService.success('Đăng xuất thành công');
      this.router.navigateByUrl("/login");
    })
  }
}
