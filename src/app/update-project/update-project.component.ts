import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Image, projectData } from '../models/project.model';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  project:projectData = new projectData();
  images : Image[] = []
  categories = [
    { value: 'food', label: 'Food' },
    { value: 'cars', label: 'Cars' },
    { value: 'art', label: 'Art' },
    { value: 'musique', label: 'Musique' },
    { value: 'games', label: 'Games' },
    { value: 'fashion', label: 'Fashion' }
  ];

  selectedFiles: { file: File, preview: string, name: string }[] = [];

  constructor(private projectService: ProjectService , private  toastr : ToastrService ,
     private route : Router , private actrout : ActivatedRoute , public imageservice : ImageService
    ) {
    this.project.category="0"
  }

  

  onFilesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({
            file,
            preview: e.target.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.project.title);
    formData.append('category', this.project.category);
    formData.append('description', this.project.description);
    formData.append('goal_amount', this.project.goal_amount.toString());
    if (this.project.website_link) {
      formData.append('website_link', this.project.website_link);
    }
    this.selectedFiles.forEach((file) => {
      formData.append('images', file.file);
    });

    this.projectService.updateProject(this.actrout.snapshot.params['id'] , formData).subscribe(
      res=>{
        this.toastr.success('Project updated successfuly' , 'Success')
        this.route.navigate(['/myProject'])

      },error=>{
        console.log(error)
      }
    )
  }

  resetForm() {
    this.selectedFiles = [];
  }

  ngOnInit(): void {
      this.projectService.getProjectById(this.actrout.snapshot.params['id']).subscribe(
        res=>{
          this.project=res
          if(res.images) this.images=res.images
        }
      )
  }

  removeImg(id:number){
    if(confirm('Are you sure you want to delete this photo ')){
      this.projectService.deleteImage(id).subscribe(
        res=>{
          this.toastr.success('Photo deleted successfully.', 'Success')
          let index = this.images.findIndex(e=> e.id===id)
          this.images.splice(index,1)
        }
      )
    }
  }
}
