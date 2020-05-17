import { RedirectLoginPasswordResetService } from './redirect-login-password-reset.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        canActivate: [RedirectLoginPasswordResetService],
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'password-recovery',
        component: PasswordRecoveryComponent
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
