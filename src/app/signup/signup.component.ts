import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username!: string;
  password!: string;
  confirmPassword!: string;
  email!: string;
  role: string = 'Investor';
  error: boolean = false;
  msgError: string = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  isValid(): boolean {
    if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.role) {
      this.msgError = 'All fields are required.';
      return false;
    }
    if (this.password !== this.confirmPassword) {
      this.msgError = 'Passwords do not match.';
      return false;
    }
    return true;
  }

  register(): void {
    if (this.isValid()) {
      this.userService.register(this.username, this.password, this.email, this.role).subscribe(
        (res) => {
          this.toastr.success('Account created successfully!', 'Success');
          this.router.navigate(['/login']); 
        },
        (error) => {
          this.error = true;
          this.msgError = error.error.detail || 'An error occurred. Please try again.';
          if(error.error.username){
            this.msgError=error.error.username
          }
          console.error(error);
        }
      );
    }
  }

  ngOnInit(): void {
    
  }
}