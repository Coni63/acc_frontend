import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { MyaccountComponent } from './features/myaccount/myaccount.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent, data : {confirm_email : false}},
  { path: 'forgot-password', component: ResetPasswordComponent, data : {step2 : false}},
  { path: 'account', component: MyaccountComponent, canActivate: [AuthGuardService]},
  { path: 'reset/:uid/:token', component: ResetPasswordComponent, data : {step2 : true}},               // url is driven by the template email
  { path: 'account-confirm-email/:token', component: RegisterComponent, data : {confirm_email : true}}, // url is driven by the template email
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
