import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecialOffer } from '../models/special-offer.model';

@Injectable({
  providedIn: 'root'
})
export class ShopAsyncService {
  constructor(private http: HttpClient) {}

  fetchShopOffer(): Observable<SpecialOffer | null> {
    return this.http.get<SpecialOffer | null>('shop/offer');
  }
}
