import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';
import { UserProfile } from '../models/user.model';
import {  Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user !:UserProfile
  search: string = '';
  projectsSuggestions: any[] = [];
  usersSuggestions: any[] = [];
  showSuggestions: boolean = false;
  role!:string|null
  private searchSubject = new Subject<string>();
  constructor(public imageService : ImageService , public userService : UserService , private route :Router , private projetService : ProjectService , private http: HttpClient){}

  logout(){
    this.userService.logout().subscribe(
      res=>{
        localStorage.removeItem('authToken')
        localStorage.removeItem('role')
        this.route.navigate(['/login'])
      }
    )
  }


  searchProjects() {
    this.searchSubject.next(this.search); 
  }

  selectSuggestion(actionTo: string, id: any): void {
    const basePath = actionTo === 'user' ? '/detail/' : '/project/';
    this.route.navigate([basePath + id]);
    this.hideSuggestionsAfterDelay()
    
    
  }
  

  hideSuggestionsAfterDelay() {
    setTimeout(() => {
      this.showSuggestions = false
      this.usersSuggestions=[]
      this.projectsSuggestions=[]
      this.search=''

    }, 300);
  }
  

  ngOnInit(): void {
      this.userService.getuserConnecter().subscribe(
        res=>this.user=res,
        error=>console.log(error.message)
      )

      this.searchSubject.pipe(
        debounceTime(100), // Wait 300ms
        distinctUntilChanged() // Only emit if the value changes
      ).subscribe(query => {
        if (query.trim().length > 0) {
          this.projetService.Suggestions(this.search).subscribe(
            res => {
              this.projectsSuggestions = res.projects
              this.usersSuggestions=res.users
            },
            err => console.error('Error fetching suggestions', err)
          );
        } else {
          this.projectsSuggestions = [];
          this.usersSuggestions = [];
        }
      });

      this.role=this.userService.getRole() 
  }
}
