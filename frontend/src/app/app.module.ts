import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './components/order/history/history.component';
import { ActiveComponent } from './components/order/active/active.component';
import { AllComponent } from './components/order/all/all.component';
import { ProfileCardComponent } from './components/user/profile-card/profile-card.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardTemplateComponent } from './pages/dashboard-template/dashboard-template.component';
import { SalesmanComponent } from './components/user/salesman/salesman.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    HistoryComponent,
    ActiveComponent,
    AllComponent,
    ProfileCardComponent,
    ProfileComponent,
    DashboardTemplateComponent,
    SalesmanComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
