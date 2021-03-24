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
  urlImage!:string;
  name!:string;
  
  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    if(this.user){
      this.user = JSON.parse(this.user);
      this.user.photoURL ? this.urlImage = this.user.photoURL : this.urlImage = "../../../../assets/images/avatar.png";
      this.user.displayName ? this.name = this.user.displayName : this.name = this.user.email;
    }
  }

}
