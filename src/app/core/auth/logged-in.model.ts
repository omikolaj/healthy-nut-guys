import { Token } from './token.model';
import { ApplicationUser } from './application-user.model';
export type LoggedIn = Pick<ApplicationUser, 'email' | 'id'> & Pick<Token, 'access_token' | 'expire_date'>;
