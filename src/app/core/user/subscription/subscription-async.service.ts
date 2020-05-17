import { UserSubscription } from './../../models/user-subscription.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionAsyncService {
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}

  getUserSubscription(id: string): Observable<UserSubscription | null> {
    return this.http.get<UserSubscription | null>(`api/users/${id}/subscription-info`, this.headers);
  }
}
