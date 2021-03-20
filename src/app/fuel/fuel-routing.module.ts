import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuelComponent } from './features/fuel/fuel.component';

const routes: Routes = [
  { path: '', component: FuelComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelRoutingModule { }
