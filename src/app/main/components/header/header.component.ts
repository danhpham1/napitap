import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './../../../auth/services/auth.service';
@Component({
  selector: 'v-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() urlImg!: string;
  @Input() name!: string;

  isDropdown:boolean;
  
  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
  ) { 
    this.isDropdown = false;
  }

  ngOnInit(): void {
  }

  toggleDropDown(){
    console.log("test");
    this.isDropdown = !this.isDropdown;
  }

  logout() {
    this.authService.logout()
      .then(rs => {
        localStorage.removeItem("user");
        this.toastrService.success('Đăng xuất thành công');
        this.router.navigateByUrl("/login");
      })
  }
}
