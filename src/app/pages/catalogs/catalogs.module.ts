
//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {CATALOGS_ROUTING} from './catalogs.routes';
import {FormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatFormFieldModule,MatInputModule} from '@angular/material';

//Componentes
import { UserCatalogComponent } from './user-catalog/user-catalog.component';
import { CatalogsComponent } from './catalogs.component';
import { TherapistCatalogComponent } from './therapist-catalog/therapist-catalog.component';
import { BranchOfficeCatalogComponent } from './branch-office-catalog/branch-office-catalog.component';
import { ServiceDayCatalogComponent } from './service-day-catalog/service-day-catalog.component';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { UserDetailComponent } from './user-catalog/user-detail.component';
import { TherapistDetailComponent } from './therapist-catalog/therapist-detail.component';
import { BranchOfficeDetailComponent } from './branch-office-catalog/branch-office-detail.component';
import { ServiceDayDetailComponent } from './service-day-catalog/service-day-detail.component';
import { ServiceDetailComponent } from './service-catalog/service-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    CATALOGS_ROUTING,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    UserCatalogComponent, 
    CatalogsComponent, 
    TherapistCatalogComponent, 
    BranchOfficeCatalogComponent, 
    ServiceDayCatalogComponent, 
    ServiceCatalogComponent, UserDetailComponent, TherapistDetailComponent, BranchOfficeDetailComponent, ServiceDayDetailComponent, ServiceDetailComponent
  ],
  exports:[
    CatalogsComponent
  ]
})
export class CatalogsModule { }
