import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { CanActivateRouteGuard } from "./can-activate-route.guard";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [CanActivateRouteGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
  },
  { path: "register", component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
