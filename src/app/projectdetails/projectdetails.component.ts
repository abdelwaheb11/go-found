import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { ActivatedRoute, Route } from '@angular/router';
import { UserService } from '../services/user.service';
import { ImageService } from '../services/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.css']
})
export class ProjectdetailsComponent implements OnInit {
  newCommentText !: string;
  count !: number
  project!:Project
  previewImage: string | ArrayBuffer | null = null;
  sendComment : boolean = false
  isFavorited = false;
  projectId !:string | null
  constructor(private projectService : ProjectService , private route : ActivatedRoute , public imageService  : ImageService , private toastr : ToastrService){}

  selectedFile: File | null = null;

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        this.selectedFile = input.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.previewImage = e.target!.result;
        };

        reader.readAsDataURL(file);
      }
    }

  removeImage(): void {
    this.previewImage = null;
  }

  addComment() {
    this.sendComment=true
    const formData = new FormData();
    formData.append('text', this.newCommentText);
    formData.append('project', this.project.id.toString());
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name); 
    }
  
    this.projectService.addComment(formData).subscribe({
      next: (res) => {
        if (this.project.commentary) {
          this.project.commentary.push(res); 
        } else {
          this.project.commentary = [res]; 
        }
        this.newCommentText = ''; 
        this.selectedFile = null; 
        this.previewImage=null
      },
      error: (err) => console.log(err),
    });
    this.sendComment=false
  }

  

 

  checkIfFavorited() {
    this.projectService.isFavorite(this.route.snapshot.params['id']).subscribe(
      res=>this.isFavorited=res.isFavorited 
    )
  }

  toggleFavorite() {
    if (this.isFavorited) {
      this.projectService.deleteFavorite(this.route.snapshot.params['id']).subscribe(
        res=>{
          this.isFavorited = false
          this.count--
          this.toastr.success('Favorite removed successfully.')
        }
      )
     
    } else {
      this.projectService.addFavorite(this.route.snapshot.params['id']).subscribe(
        res=>{
          this.isFavorited = true
          this.count++
          this.toastr.success('Project added to favorites successfully.')
        }
      )
      
    }
  }

  loadProjectData(){
    this.projectService.getProjectById(this.route.snapshot.params['id']).subscribe(
      res=>{
        this.project=res
        
        this.checkIfFavorited();
        this.projectService.getCountFavorite(this.route.snapshot.params['id']).subscribe(
          res=> this.count = res.favoriteCount
        )
      }
    )
  }
  
   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');  
      this.loadProjectData();  // Charge les données du projet
    });
      
       
      if(this.project.investment!==undefined){
        const dates = this.project.investment.map(investment => new Date(investment.created_at).toLocaleDateString());
        const investedAmounts = this.project.investment.map(investment => parseFloat(investment.amount.toString()));
        
  
      // Create Chart
      }}
}
