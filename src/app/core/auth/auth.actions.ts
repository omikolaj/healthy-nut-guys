import { ApplicationUser } from './application-user.model';
import { LoggedIn } from './logged-in.model';
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoggedIn) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
