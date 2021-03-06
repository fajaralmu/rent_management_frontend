import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './../pages/login/login.component';
import { HomeComponent } from './../pages/home/home.component';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';
import { ManagementComponent } from './../pages/management/management.component';
import { ManagementDetailComponent } from './../pages/management/management-detail/management-detail.component';
import { FormComponent } from './../pages/management/form/form.component';
import { SupplyFormComponent } from '../pages/transaction/supply-form/supply-form.component';
import { CatalogComponent } from './../pages/catalog/catalog.component';

const routes: Routes = [
  // { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'management/:entityName', component: ManagementDetailComponent },
  { path: 'management/form/:entityName', component: FormComponent },
  { path: 'supply', component: SupplyFormComponent },


  { path: 'catalog', component: CatalogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
