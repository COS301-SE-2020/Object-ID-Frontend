import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', 
    component: HomeComponent,
    canActivate: [CanActivateRouteGuard]  
  },
  { path: 'upload', 
    component: UploadComponent,
    canActivate: [CanActivateRouteGuard]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
