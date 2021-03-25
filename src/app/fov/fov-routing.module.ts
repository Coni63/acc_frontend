import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FovComponent } from './features/fov/fov.component';

const routes: Routes = [
  { path: '', component: FovComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FovRoutingModule { }
