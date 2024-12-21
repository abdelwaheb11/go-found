import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ImageService } from '../services/image.service';
import { UserProfile } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userProfile!: UserProfile;
  projects: any[] = [];
  msgError: string = '';
  image: File | null = null;
  imagePreview: string | null = null;

  

  constructor(
    private userService: UserService,
    public imageserive : ImageService,
    private toatr : ToastrService,
    private projectService : ProjectService,
    
  ) {}

  ngOnInit(): void {
    this.userService.getuserConnecter().subscribe(
      res=>this.userProfile=res
    )

    this.projectService.getinvestments().subscribe(
      res=>this.projects=res
    )

  }

  update(): void {
    const formData = new FormData();
    formData.append('first_name', this.userProfile.user.first_name);
    formData.append('last_name', this.userProfile.user.last_name);
    formData.append('email', this.userProfile.user.email);
    formData.append('desc', this.userProfile.desc ? this.userProfile.desc :'');
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }

    this.userService.updateUserProfile(formData).subscribe(
      response => {
        
        this.toatr.success('Profile updated successfully!', 'Success');
      },
      error => {
        this.msgError = 'Error updating profile : ' +error.detail;
        console.error(error);
      }
    );
  }

  onImageChange(event: any): void {
    // Récupérer le fichier sélectionné
    const file = event.target.files[0];
    if (file) {
      this.image = file;
      const reader = new FileReader();
  
      // Lorsque la lecture du fichier est terminée, nous assignons l'URL de l'image pour l'aperçu
      reader.onload = (e) => {
        this.imagePreview = e.target!.result as string;  // Stocker l'URL de l'image en base64 pour l'aperçu
      };
  
      reader.readAsDataURL(file);
    }
  }
  

  

}
