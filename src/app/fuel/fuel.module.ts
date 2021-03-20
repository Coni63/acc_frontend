import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuelRoutingModule } from './fuel-routing.module';

import { FuelComponent } from './features/fuel/fuel.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FuelComponent
  ],
  imports: [
    CommonModule,
    FuelRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class FuelModule {
  constructor(){
    console.log("Fuel Loaded");
  }
}
