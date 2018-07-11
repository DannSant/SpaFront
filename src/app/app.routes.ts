import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { AppointmentComponent } from './pages/appointments/appointment.component';



const app_routes: Routes = [
  { path: 'home', component: HomeComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'appointment/:id', component: AppointmentComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);