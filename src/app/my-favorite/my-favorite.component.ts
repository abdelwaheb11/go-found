import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { ImageService } from '../services/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.css']
})
export class MyFavoriteComponent implements OnInit {

  project : Project[]=[]

  constructor(private projectService : ProjectService , public imageService : ImageService , private toastr : ToastrService){

  }

  removeFavorite(projectId: number) {
    let c = confirm('Are you sure you want to delete this favorite?')
    if (c)
    this.projectService.deleteFavorite(projectId).subscribe(
      res=>{
        this.toastr.success('Favorite remove successfuly.')
        let indexProject = this.project.findIndex(e=>e.id===projectId)
        this.project.splice(indexProject,1)
      }
    )
  }

  ngOnInit(): void {
      this.projectService.getProjectUserFavorite().subscribe(
        res=>this.project=res
      )
  }
}
