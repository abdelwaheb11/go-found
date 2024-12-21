import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdminprojectsComponent} from './adminprojects/adminprojects.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { AuthGuard } from './garde/auth.guard';
import { InvestComponent } from './invest/invest.component';
import { DashboardCreatorComponent } from './dashboard-creator/dashboard-creator.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./app.module').then(m => m.AppModule)
  },
  {path:"",component : HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: UserprofileComponent , canActivate: [AuthGuard] },
  { path: 'adminuser', component: AdminusersComponent },
  { path: 'adminprj', component: AdminprojectsComponent },
  { path: 'userd', component: UserdetailsComponent ,canActivate: [AuthGuard] },
  { path: 'project/:id/invest', component:  InvestComponent , canActivate: [AuthGuard],},
  { path: 'project/:id', component:  ProjectdetailsComponent , canActivate: [AuthGuard],},
  { path: 'dashboard', component:  DashboardCreatorComponent , canActivate: [AuthGuard],},
  { path: 'addProject', component:  AddProjectComponent , canActivate: [AuthGuard],},
  { path: 'updateProject/:id', component:  UpdateProjectComponent , canActivate: [AuthGuard],},
  { path: 'myProject', component:  MyProjectComponent , canActivate: [AuthGuard],},
  { path: 'detail/:username', component:  UserdetailsComponent , canActivate: [AuthGuard],},
  { path: 'myFavorites', component:  MyFavoriteComponent , canActivate: [AuthGuard],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
