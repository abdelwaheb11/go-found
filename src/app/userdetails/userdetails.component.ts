import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserProfile } from '../models/user.model';
import { ImageService } from '../services/image.service';
import { Project, projectData } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  user!:UserProfile
  project:any[]=[]
  username !:string |null
  constructor(private userService:UserService , public imageservice:ImageService , private projectservice : ProjectService , private actroute : ActivatedRoute){}

  loadProjectData(){
    this.userService.getuserByUsername(this.actroute.snapshot.params['username']).subscribe(
      res=>{
        this.user=res
        if(this.user.role==='creator')
          this.projectservice.getProjectByUsername(this.actroute.snapshot.params['username']).subscribe(
            res=>this.project=res
          )
        else
        this.projectservice.getInvestByUsername(this.actroute.snapshot.params['username']).subscribe(
          res=>this.project=res
        )

      }
    )
  }
  ngOnInit(): void {
    this.actroute.paramMap.subscribe(params => {
      this.username = params.get('username');  
      this.loadProjectData();  // Charge les données du projet
    });
      
      

  }
}
