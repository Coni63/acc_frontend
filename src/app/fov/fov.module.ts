import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FovRoutingModule } from './fov-routing.module';
import { FovFormComponent } from './features/fov-form/fov-form.component';
import { FovComponent } from './features/fov/fov.component';
import { FovResultComponent } from './features/fov-result/fov-result.component';


@NgModule({
  declarations: [
    FovFormComponent,
    FovComponent,
    FovResultComponent
  ],
  imports: [
    CommonModule,
    FovRoutingModule
  ]
})
export class FovModule {
  constructor(){
    console.log("FOV Loaded");
  }
 }
