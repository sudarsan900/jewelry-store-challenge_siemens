import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout.component';
import { AppLayoutRoutingModule } from './app-layout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppLayoutRoutingModule
  ],
  declarations: [AppLayoutComponent]
})
export class AppLayoutModule { }
