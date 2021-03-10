import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { DatasetManagerComponent } from './components/dataset-manager/dataset-manager.component';
import { UserGuard } from './_guards/user.guard';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'dataset', component: DatasetManagerComponent/*, canActivate: [UserGuard]*/ },
  { path: '', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
