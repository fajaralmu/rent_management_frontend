import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormGroupComponent } from './forms/form-group/form-group.component';
import { CardComponent } from './container/card/card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AlertComponent } from './message/alert/alert.component';
import { ManagementComponent } from './pages/management/management.component';
import { ManagementDetailComponent } from './pages/management/management-detail/management-detail.component';
import { DataTableHeaderComponent } from './pages/management/data-table-header/data-table-header.component';
import { PaginationButtonComponent } from './navigation/pagination-button/pagination-button.component';
import { DataTableContentComponent } from './pages/management/data-table-content/data-table-content.component';
import { FormComponent } from './pages/management/form/form.component';
import { InputImageComponent } from './pages/management/form/input/input-image/input-image.component';
import { SupplyFormComponent } from './pages/transaction/supply-form/supply-form.component';
import { LoadingComponent } from './message/loading/loading.component';
import { SupplierFormComponent } from './pages/transaction/supplier-form/supplier-form.component';
import { ProductFormComponent } from './pages/transaction/product-form/product-form.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CatalogItemComponent } from './pages/catalog/catalog-item/catalog-item.component';
import { CatalogDetailComponent } from './pages/catalog/catalog-detail/catalog-detail.component';
import { ImageCarouselComponent } from './container/image-carousel/image-carousel.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormGroupComponent,
    CardComponent,
    DashboardComponent,
    AlertComponent,
    ManagementComponent,
    ManagementDetailComponent,
    DataTableHeaderComponent,
    PaginationButtonComponent,
    DataTableContentComponent,
    FormComponent,
    InputImageComponent,
    SupplyFormComponent,
    LoadingComponent,
    SupplierFormComponent,
    ProductFormComponent,
    CatalogComponent,
    CatalogItemComponent,
    CatalogDetailComponent,
    ImageCarouselComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
