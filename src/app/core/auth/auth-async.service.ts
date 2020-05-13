import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationUser } from './application-user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from './token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthAsyncService {
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  login(user: ApplicationUser): Observable<Token> {
    return this.http.post<Token>('api/login', JSON.stringify(user), this.headers);
  }

  logout(): Observable<boolean> {
    return this.http.delete<boolean>('api/logout');
  }
}
