import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditBookComponent } from './admin/edit-book/edit-book.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'admin/dashboard',
    component:AdminDashboardComponent
  },
  {
    path:'user/dashboard',
    component:UserDashboardComponent
  },
  {
    path:'user/dashboard/home',
    component:WelcomeComponent
  },
  { 
    path: 'edit-book/:id', 
    component: EditBookComponent 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
