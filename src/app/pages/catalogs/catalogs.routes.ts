import { RouterModule, Routes } from '@angular/router';
import { CatalogsComponent } from './catalogs.component';
import { UserCatalogComponent } from './user-catalog/user-catalog.component';
import { TherapistCatalogComponent } from './therapist-catalog/therapist-catalog.component';
import { BranchOfficeCatalogComponent } from './branch-office-catalog/branch-office-catalog.component';
import { ServiceDayCatalogComponent } from './service-day-catalog/service-day-catalog.component';
import { ServiceCatalogComponent } from './service-catalog/service-catalog.component';
import { UserDetailComponent } from './user-catalog/user-detail.component';
import { TherapistDetailComponent } from './therapist-catalog/therapist-detail.component';
import { BranchOfficeDetailComponent } from './branch-office-catalog/branch-office-detail.component';
import { ServiceDayDetailComponent } from './service-day-catalog/service-day-detail.component';
import { ServiceDetailComponent } from './service-catalog/service-detail.component';




const CATALOGS_ROUTES: Routes = [
  { 
      path: 'catalogs', 
      component: CatalogsComponent,
      children:[
        { path: 'user', component: UserCatalogComponent },
        { path: 'user/:id', component: UserDetailComponent },
        { path: 'therapist', component: TherapistCatalogComponent },
        { path: 'therapist/:id', component: TherapistDetailComponent },
        { path: 'branchOffice', component: BranchOfficeCatalogComponent },
        { path: 'branchOffice/:id', component: BranchOfficeDetailComponent },
        { path: 'serviceDay', component: ServiceDayCatalogComponent },
        { path: 'serviceDay/:id', component: ServiceDayDetailComponent },
        { path: 'service', component: ServiceCatalogComponent },
        { path: 'service/:id', component: ServiceDetailComponent },
        {path:'',redirectTo:'/user',pathMatch:"full"}
      ] 
    }, 
  
];

export const CATALOGS_ROUTING = RouterModule.forRoot(CATALOGS_ROUTES);