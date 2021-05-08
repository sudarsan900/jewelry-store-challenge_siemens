import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppNumericDirective } from 'src/app/directives/app-numeric.directive';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponent } from './shared.component';

@NgModule({
  declarations: [
    AppNumericDirective,
    SharedComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgbModalModule
  ],
  exports: [
    ReactiveFormsModule,
    AppNumericDirective,
    NgbModalModule
  ]
})
export class SharedModule { }
