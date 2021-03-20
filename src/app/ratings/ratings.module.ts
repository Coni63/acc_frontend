import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingsRoutingModule } from './ratings-routing.module';

import { HistoryComponent } from './components/history/history.component';
import { DistributionComponent } from './components/distribution/distribution.component';
import { RadarComponent } from './components/radar/radar.component';
import { RatingsComponent } from './features/ratings/ratings.component';
import { MaterialsModule } from '../materials/materials.module';

import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RatingsComponent,
    HistoryComponent,
    DistributionComponent,
    RadarComponent
  ],
  imports: [
    CommonModule,
    RatingsRoutingModule,
    MaterialsModule, 
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class RatingsModule { }
