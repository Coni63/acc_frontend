import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherResultComponent } from './features/weather-result/weather-result.component';
import { WeatherComponent } from './features/weather/weather.component';
import { WeatherFormComponent } from './features/weather-form/weather-form.component';


@NgModule({
  declarations: [WeatherResultComponent, WeatherComponent, WeatherFormComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule { }
