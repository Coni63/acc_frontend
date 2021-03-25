import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/services/auth-guard.service';

import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { 
    path: "auth",
    // loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
    loadChildren: () => AuthModule
  },
  { 
    path: "fuel",
    loadChildren: () => import('./fuel/fuel.module').then((m) => m.FuelModule)
  },
  { 
    path: "ratings",
    canActivate: [AuthGuardService],
    loadChildren: () => import('./ratings/ratings.module').then((m) => m.RatingsModule)
  },
  { 
    path: "fov",
    loadChildren: () => import('./fov/fov.module').then((m) => m.FovModule)
  },
  { 
    path: "weather",
    loadChildren: () => import('./weather/weather.module').then((m) => m.WeatherModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
