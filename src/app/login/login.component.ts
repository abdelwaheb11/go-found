import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!:string;
  password!:string;
  error:boolean=false;
  msgError!:string

  constructor(private userService:UserService , private rout : Router){

  }

  login(){
    this.error=false
    if(this.username && this.password){
      this.userService.login(this.username,this.password).subscribe(
        res=>{
          localStorage.setItem('authToken',res.token)
          localStorage.setItem('role',res.role)
          this.rout.navigate([''])
        },error=>{
          console.log(error.detail),
          this.error=true,
          this.msgError="Username or Password invalid!"
        }
      )
    }else{
      this.error=true
      this.msgError="Username and Password required!"
    }
  }

  ngOnInit(): void {
    
    
}
}
