import { ApplicationUser } from './application-user.model';
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: ApplicationUser) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
