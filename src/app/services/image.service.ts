import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor() { }

  getimageProject(imagePath: string | undefined | null): string {
    return imagePath ? `https://gofound.up.railway.app/media/${imagePath}` : 'assets/default-image.jpg';
  }

  getimageProjectsansMedia(imagePath: string | undefined): string {
    console.log(imagePath)
    return imagePath ? `https://gofound.up.railway.app${imagePath}` : 'assets/default-image.jpg';
  }

  getimageUsersWithMedia(imagePath: string | undefined): string {
    console.log(imagePath)
    return imagePath ? `https://gofound.up.railway.app/media/${imagePath}` : 'assets/default-image.jpg';
  }

  getimageUser(imagePath: string | undefined): string {
    return imagePath ? `https://gofound.up.railway.app${imagePath}` : 'assets/default-image-user.jpg';
  }

  getimageComent(imagePath: string | undefined): string {
    return imagePath ? `https://gofound.up.railway.app${imagePath}` : '';
  }
}
