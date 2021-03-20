import { NgModule } from '@angular/core';
import { FormControlDirective } from './directives/form-control.directive';


@NgModule({
  declarations: [
    FormControlDirective
  ],
  exports: [
    FormControlDirective
  ]
})
export class SharedModule { }
