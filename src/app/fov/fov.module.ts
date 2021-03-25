import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FovRoutingModule } from './fov-routing.module';
import { FovFormComponent } from './features/fov-form/fov-form.component';
import { FovComponent } from './features/fov/fov.component';
import { FovResultComponent } from './features/fov-result/fov-result.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    FovFormComponent,
    FovComponent,
    FovResultComponent
  ],
  imports: [
    CommonModule,
    FovRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
  ]
})
export class FovModule {
  constructor(){
    console.log("FOV Loaded");
  }
 }
