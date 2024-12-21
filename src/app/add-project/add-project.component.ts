import { Component } from '@angular/core';
import {  projectData } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  project:projectData = new projectData();
  categories = [
    { value: 'food', label: 'Food' },
    { value: 'cars', label: 'Cars' },
    { value: 'art', label: 'Art' },
    { value: 'musique', label: 'Musique' },
    { value: 'games', label: 'Games' },
    { value: 'fashion', label: 'Fashion' }
  ];

  selectedFiles: { file: File, preview: string, name: string }[] = [];

  constructor(private projectService: ProjectService , private  toastr : ToastrService , private route : Router) {
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

    this.projectService.createProject(formData).subscribe(
      res=>{
        this.toastr.success('Project added successfuly' , 'Success')
        this.route.navigate(['/myProject'])

      },error=>{
        console.log(error)
      }
    )
  }

  resetForm() {
    this.selectedFiles = [];
  }
  
}
