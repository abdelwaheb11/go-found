import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdminprojectsComponent } from './adminprojects/adminprojects.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { InvestComponent } from './invest/invest.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { DashboardCreatorComponent } from './dashboard-creator/dashboard-creator.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { MyFavoriteComponent } from './my-favorite/my-favorite.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UserprofileComponent,
    AdminprojectsComponent,
    AdminusersComponent,
    ProjectdetailsComponent,
    UserdetailsComponent,
    NavbarComponent,
    InvestComponent,
    DashboardCreatorComponent,
    AddProjectComponent,
    UpdateProjectComponent,
    MyProjectComponent,
    MyFavoriteComponent,
    AcceuilComponent
  ],
  imports: [
    FormsModule ,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-custom-position',
      preventDuplicates: true,
    }),
  ],
  providers: [
    provideAnimations(), 
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
