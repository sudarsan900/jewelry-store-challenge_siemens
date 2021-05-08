import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/authentication/authentication.module').then(o => o.AuthenticationModule) },
  { path: 'app', loadChildren: () => import('./modules/app-layout/app-layout.module').then(o => o.AppLayoutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
