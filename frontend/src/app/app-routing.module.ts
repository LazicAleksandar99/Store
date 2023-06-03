import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouteGuard } from './core/route.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardTemplateComponent } from './pages/dashboard-template/dashboard-template.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';

// all: {
//   r1: "Customer",
//   r2: "Salesman",
//   r3: "Administrator"
// }

const routes: Routes = [
  {path:"", redirectTo:'login', pathMatch:'full'},
  {
    path:'login', component: LoginComponent
  },
  {
    path:'register', component: RegistrationComponent
  },
  {
    path:'dashboard', component: DashboardComponent, canActivate: [RouteGuard],
    data: {
      r1: "Customer",
      r2: "Salesman",
      r3: "Administrator"
    },
    children:[
      {
        path:'main', component: DashboardTemplateComponent, canActivate: [RouteGuard],
        data: {
          r1: "Customer",
          r2: "Salesman",
          r3: "Administrator"
        }
      },
      {
        path:'profile', component: ProfileComponent, canActivate: [RouteGuard],
        data: {
          r1: "Customer",
          r2: "Salesman",
          r3: "Administrator"
        }
      },
      {
        path:'article/:id', component: EditArticleComponent, canActivate: [RouteGuard],
        data: {
          r2: "Salesman",
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
