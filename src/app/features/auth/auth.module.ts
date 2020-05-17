import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, SignUpComponent, LogoutComponent, PasswordRecoveryComponent, PasswordResetComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
