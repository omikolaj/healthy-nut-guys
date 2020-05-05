import { AboutAsyncService } from './about-async.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AboutFacadeService {
  constructor(private store: Store, private aboutAsync: AboutAsyncService) {}

  getShopOffer(): void {
    this.aboutAsync.fetchShopOffer().subscribe(res => console.log(res));
  }
}
