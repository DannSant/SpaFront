//Modulos
import {RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID} from '@angular/core';
import {APP_ROUTING} from './app.routes';
import {FormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatFormFieldModule,MatInputModule} from '@angular/material';
import { CatalogsModule } from './pages/catalogs/catalogs.module';
import {HttpClientModule} from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { AppointmentComponent } from './pages/appointments/appointment.component';
import { PastAppointmentsComponent } from './pages/appointments/listing/past-appointments.component';
import { CurrentAppointmentsComponent } from './pages/appointments/listing/current-appointments.component';
import { AgendaComponent } from './pages/agenda/agenda.component';

//Servicios
import {AlertService} from './services/alert.service';
import {UserService} from './services/user.service';
import { ServicesService } from './services/services.service';
import { BranchOfficeService } from './services/branch-office.service';
import { ServiceDayService } from './services/service-day.service';
import { TherapistService } from './services/therapist.service';
import { AppointmentService } from './services/appointment.service';
import { LoggedGuard } from './services/guards/logged.guard';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

//Pipes
import { DurationPipe } from './pipes/duration.pipe';
import { AppointmentStatusPipe } from './pipes/appointment-status.pipe';


registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ServicesComponent,
    AppointmentsComponent,
    AppointmentComponent,
    PastAppointmentsComponent,
    CurrentAppointmentsComponent,
    DurationPipe,
    AppointmentStatusPipe,
    AgendaComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    CatalogsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    AlertService,
    UserService,
    ServicesService,
    BranchOfficeService,
    ServiceDayService,
    TherapistService,
    AppointmentService,
    LoggedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
