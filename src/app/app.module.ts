/// <reference types="@types/googlemaps" />
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopMenuComponent } from './top-menu/top-menu.component';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
=======
import { UploadComponent } from './upload/upload.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

>>>>>>> update-ui


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TopMenuComponent,
    RegisterComponent,
    DashboardComponent,
    AboutComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbCollapseModule,
    GoogleMapsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    CanActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
