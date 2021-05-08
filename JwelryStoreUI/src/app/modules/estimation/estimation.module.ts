import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstimationFormComponent } from './estimation-form/estimation-form.component';
import { EstimationRoutingModule } from './estimation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrintToScreeModalComponent } from './print-to-scree-modal/print-to-scree-modal.component';

@NgModule({
  imports: [
    CommonModule,
    EstimationRoutingModule,
    SharedModule
  ],
  declarations: [EstimationFormComponent, PrintToScreeModalComponent],
  entryComponents: [PrintToScreeModalComponent]
})
export class EstimationModule { }
