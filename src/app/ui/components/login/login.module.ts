import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';




@NgModule({
  declarations: [  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component: LoginComponent}
    ]),

  ],
  exports:[
  ]
})
export class LoginModule { }
