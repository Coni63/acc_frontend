import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingsComponent } from './features/ratings/ratings.component';

const routes: Routes = [
  { path: '', component: RatingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingsRoutingModule { }
