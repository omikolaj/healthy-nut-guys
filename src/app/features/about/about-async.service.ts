import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopOffer } from 'app/core/models/shop-offer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutAsyncService {
  constructor(private http: HttpClient) {}

  fetchShopOffer(): Observable<ShopOffer | null> {
    return this.http.get<ShopOffer | null>('api/shop/offer');
  }
}
