import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent implements OnInit {

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchText: string = '';
  sortDirection: { [key: string]: boolean } = {
    category: true,
    title: true,
    description: true,
    goal_amount: true,
    raised_amount: true
  };
  category:string="0"
  categories = [
    { value: 'food', label: 'Food' },
    { value: 'cars', label: 'Cars' },
    { value: 'art', label: 'Art' },
    { value: 'musique', label: 'Musique' },
    { value: 'games', label: 'Games' },
    { value: 'fashion', label: 'Fashion' }
  ];
  constructor(private projectService: ProjectService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadProjects();
  }
  
  loadProjects(): void {
    this.projectService.getProjectUser().subscribe({
      next: (res) => {
        this.projects = res;
        this.filteredProjects = [...this.projects];
      },
      error: (err) => {
        this.toastr.error('Failed to load projects.', 'Error');
        console.error(err);
      }
    });
  }

  filterProjects(): void {
    this.filteredProjects = this.projects.filter(project =>
      project.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      project.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
      project.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  filterProjectsbycategory(){
    if(this.category === "0"){
      this.filteredProjects = this.projects
      return
    }
    this.filteredProjects = this.projects.filter(project =>project.category.toLowerCase().includes(this.category.toLowerCase()))
  }

  claerfilter(){
    this.filteredProjects = this.projects
  }

  

  deleteProject(id: number , title : string): void {
    if (confirm(`Are you sure you want to delete this project :${title} ?`)) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.toastr.success('Project deleted successfully.', 'Success');
          this.projects = this.projects.filter(project => project.id !== id);
          this.filterProjects();
        },
        error: (err) => {
          this.toastr.error('Failed to delete the project.', 'Error');
          console.error(err);
        }
      });
    }
  }

  

  sortTable(c: keyof Project): void {
    // Inverser la direction du tri (true = ascendant, false = descendant)
    this.sortDirection[c] = !this.sortDirection[c];
    
  
    // Trier les projets en fonction de la colonne et de la direction
    this.filteredProjects.sort((a, b) => {
      const valueA = a[c];
      const valueB = b[c];
  
      // Si les valeurs sont des nombres ou des chaînes
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection[c] ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection[c] ? valueA - valueB : valueB - valueA;
      } else {
        return 0; 
      }
    });
  }

  getSortIcon(column: keyof Project): string {
    return this.sortDirection[column] ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill text-success';
  }
}
