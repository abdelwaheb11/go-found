import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  setHeadres(){
    let jwt = this.userService.getToken();
    jwt = "Token "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return {headers:httpHeaders}
  }
  private apiUrl = 'https://gofound.up.railway.app/api/project/'; 

  constructor(private http: HttpClient , private userService : UserService) {}

  // Récupérer tous les projets
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  filterProjects(category :string | null , search : string | null): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}?category=${category}&search=${search}`);
  }

  // Récupérer un projet par ID
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}${id}`);
  }

  // Créer un nouveau projet
  createProject(project: FormData): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project , this.setHeadres());
  }

  // Mettre à jour un projet existant
  updateProject(id: number, project: FormData): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}${id}`, project ,  this.setHeadres());
  }

  // Supprimer un projet
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`,  this.setHeadres());
  }

  Suggestions(q:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+'suggestions?q='+q);
  }

  addComment(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl + 'comments', formData, this.setHeadres());
  }

  investe(a: number , p : number): Observable<any> {
    return this.http.post(this.apiUrl + 'investments', {"amount" : a,"project":p}, this.setHeadres());
  }

  getinvestments(): Observable<any> {
    return this.http.get(this.apiUrl + 'investments', this.setHeadres());
  }

  getProjectUser(): Observable<any> {
    return this.http.get(this.apiUrl + 'user', this.setHeadres());
  }

  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}image/${id}`,  this.setHeadres());
  }

  getProjectByUsername(username: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}projectUser/${username}`,  this.setHeadres());
  }

  getInvestByUsername(username: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}investUser/${username}`,  this.setHeadres());
  }

  addFavorite(projectId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}favorates/${projectId}/`, {}  ,this.setHeadres());
  }

  deleteFavorite(projectId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}favorates/${projectId}/` , this.setHeadres());
  }

  getCountFavorite(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}favorates/${projectId}/?action=count`,  this.setHeadres());
  }

  getProjectUserFavorite(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiUrl}favorates/${0}`,  this.setHeadres());
  }

  isFavorite(projectId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}favorates/${projectId}/?action=isFavorited`,  this.setHeadres());
  }
  

  
  
}
