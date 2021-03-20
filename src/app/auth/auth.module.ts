import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './features/login/login.component'
import { RegisterComponent } from './features/register/register.component';
import { MyaccountComponent } from './features/myaccount/myaccount.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlDirective } from './directives/form-control.directive';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MyaccountComponent,
    ResetPasswordComponent,
    FormControlDirective,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    MyaccountComponent,
    ResetPasswordComponent,
  ],
  providers: [
    JwtHelperService,
  ]
})
export class AuthModule {
  constructor(){
    console.log("Auth Loaded");
  }
}
