import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuelRoutingModule } from './fuel-routing.module';

import { FuelComponent } from './features/fuel/fuel.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ResultComponent } from './components/result/result.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResultInfoComponent } from './components/result-info/result-info.component';
import { SimulationTableComponent } from './components/simulation-table/simulation-table.component';

@NgModule({
  declarations: [
    FuelComponent,
    ResultComponent,
    ResultInfoComponent,
    SimulationTableComponent,
  ],
  imports: [
    CommonModule,
    FuelRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
  ],
  exports: [
  ]
})
export class FuelModule {
  constructor(){
    console.log("Fuel Loaded");
  }
}
