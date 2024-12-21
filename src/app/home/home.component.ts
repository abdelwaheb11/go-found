import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { UserProfile } from '../models/user.model';
import { Router } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  topCreators:UserProfile[]=[]
  topInvestors:UserProfile[]=[]

  projects:Project[]=[]
  user !: UserProfile
  category!:string
  

  // Categories
  categories: string[] = ['food', 'games', 'art', 'cars', 'musique', 'fashion'];
  search: string = '';

  // Sorting Options
  sortOptions: string[] = ['A-Z', 'Biggest', 'Goal'];
  sort :number = 0;

  constructor(private projectService:ProjectService , public userService : UserService , private route : Router , public imageService : ImageService){}

  

  // Filter Projects by Category
  filterByCategory(category: string): void {
    if (this.category === category) {
      this.getallproject()
    } else {
      this.category = category; // Définit la catégorie choisie
    }
    this.projectService.filterProjects(category , this.search).subscribe(
      res=>this.projects=res,
      error=>console.log(error.message)
    )
  }

  // Sort Projects
  sortProjects(sortOption: number): void {
    this.sort=sortOption
    switch (sortOption) {
      case 0:
        this.projects.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 1:
        this.projects.sort((a, b) => b.raised_amount - a.raised_amount);
        break;
      case 2:
        this.projects.sort((a, b) => {
          if (b.goal_amount !== a.goal_amount) {
            return b.goal_amount - a.goal_amount; // Higher goal first
          }
          return a.title.localeCompare(b.title); // Fallback to alphabetical order
        });
        break;
      default:
        break;
    }
  }

  // Search Projects
  searchProjects(): void {
    if(this.search){
      let c = this.category !=='all' ? this.category : '';
      this.projectService.filterProjects(c , this.search).subscribe(
        res=>this.projects=res,
        error=>console.log(error.message)
      )
    }
  }

  getallproject(){
    this.category='all'
    this.search=''
    this.projectService.getProjects().subscribe(
      res=>this.projects=res,
      error=>console.log(error.message)
    )

  }


 

  ngOnInit(): void {
      this.getallproject()
      this.userService.topCreator().subscribe(
        res=>this.topCreators=res
      )
      this.userService.topInvestors().subscribe(
        res=>this.topInvestors=res
      )

      
     
  }
}
