import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimationFormComponent } from './estimation-form/estimation-form.component';

const routes: Routes = [
  { path: '', component: EstimationFormComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EstimationRoutingModule { }
