//Modulos
import {RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_ROUTING} from './app.routes';
import {FormsModule} from '@angular/forms'

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';

//Servicios
import {AlertService} from './services/alert.service';
import {UserService} from './services/user.service';
import { ServicesService } from './services/services.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ServicesComponent,
    AppointmentsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AlertService,
    UserService,
    ServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
