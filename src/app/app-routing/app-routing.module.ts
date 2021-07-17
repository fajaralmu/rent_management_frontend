import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './../pages/login/login.component';
import { HomeComponent } from './../pages/home/home.component';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],



exports: [RouterModule]
})
export class AppRoutingModule { }
