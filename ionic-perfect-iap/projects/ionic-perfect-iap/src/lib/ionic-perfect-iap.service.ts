import { IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { IStore } from './stores/store.interface';
import { Injectable } from '@angular/core';
import { RegisterProductIdentifier } from './interfaces/register-product-identifier.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IonicPerfectIapService {
  private store: IStore;
  private _products: IAPProduct[] = [];

  constructor() {
  }

  get products() {
    return this._products;
  }

  async initialize(store: IStore, products: RegisterProductIdentifier[]) {
    this.store = store;

    await this.registerProducts(products);

    this.store.refresh();

    await this.store.ready();
  }

  async buy(product: string | IAPProduct) {
    if (typeof product === "string") {
      await this.store.order(product);
    }
    else {
      await this.store.order(product.id);
    }

    return {};
  }

  purchased(product: string | IAPProduct): Promise<IAPProduct> {
    return new Promise((resolve, reject) => {
      this.approved(product).subscribe(p => {
        p.verify();
      }, err => {
        reject(err);
      });

      this.verified(product).subscribe(p => {
        p.finish();
        resolve(p);
      }, err => {
        reject(err);
      });
    });
  }

  owned(product: string | IAPProduct): Observable<IAPProduct> {
    if (typeof product === "string") {
      return this.store.owned(product);
    }
    else {
      return this.store.owned(product.id);
    }
  }

  approved(product: string | IAPProduct): Observable<IAPProduct> {
    if (typeof product === "string") {
      return this.store.approved(product);
    }
    else {
      return this.store.approved(product.id);
    }
  }

  verified(product: string | IAPProduct): Observable<IAPProduct> {
    if (typeof product === "string") {
      return this.store.verified(product);
    }
    else {
      return this.store.verified(product.id);
    }
  }

  private async registerProducts(products: RegisterProductIdentifier[]) {
    for (const identifier of products) {
      const product = await this.store.registerProduct(identifier.id, identifier.type);
      this._products.push(product);
    }
  }
}
