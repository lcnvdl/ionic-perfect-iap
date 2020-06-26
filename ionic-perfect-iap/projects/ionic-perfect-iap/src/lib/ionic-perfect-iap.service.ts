import { StringHelper } from './helpers/string.helper';
import { IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { IStore } from './stores/store.interface';
import { Injectable } from '@angular/core';
import { RegisterProductIdentifier } from './interfaces/register-product-identifier.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IonicPerfectIapService {
  private store: IStore;
  private _products: IAPProduct[] = [];
  private _isReady = false;
  public verbose = false;

  constructor() {
  }

  get isReady() {
    return this._isReady;
  }

  get products() {
    return this._products;
  }

  async initialize(store: IStore, products: RegisterProductIdentifier[]) {
    this.store = store;

    await this.registerProducts(products);

    this.store.refresh();

    await this.store.ready();

    this._isReady = true;
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

  purchased(product: string | IAPProduct, onlyNewPurchases = true): Promise<IAPProduct> {
    return new Promise((resolve, reject) => {
      this.approved(product).subscribe(p => {
        p.verify();
      }, err => {
        reject(err);
      });

      this.verified(product).subscribe(p => {
        p.finish();
        this.addOrReplace(p);
        resolve(p);
      }, err => {
        reject(err);
      });

      if (!onlyNewPurchases) {
        this.owned(product).subscribe(p => {
          this.addOrReplace(p);
          resolve(p);
        }, err => {
          reject(err);
        });
      }
    });
  }

  owned(product: string | IAPProduct): Observable<IAPProduct> {
    let observable: Observable<IAPProduct>;
    if (typeof product === "string") {
      observable = this.store.owned(product);
    }
    else {
      observable = this.store.owned(product.id);
    }

    observable.pipe(map(m => this.addOrReplace(m)));

    return observable;
  }

  approved(product: string | IAPProduct): Observable<IAPProduct> {
    let observable: Observable<IAPProduct>;
    if (typeof product === "string") {
      observable = this.store.approved(product);
    }
    else {
      observable = this.store.approved(product.id);
    }

    observable.pipe(map(m => this.addOrReplace(m)));

    return observable;
  }

  verified(product: string | IAPProduct): Observable<IAPProduct> {
    let observable: Observable<IAPProduct>;
    if (typeof product === "string") {
      observable = this.store.verified(product);
    }
    else {
      observable = this.store.verified(product.id);
    }

    observable.pipe(map(m => this.addOrReplace(m)));

    return observable;
  }

  private addOrReplace(product: IAPProduct) {
    this.verbose && console.log("Add or replace", product);

    if (this._products.some(m => m.id === product.id)) {
      this._products = this._products.filter(m => m.id !== product.id);
    }

    this._products.push(product);

    return product;
  }

  private async registerProducts(products: RegisterProductIdentifier[]) {
    for (const identifier of products) {
      this.verbose && console.log("Registering product...", identifier);
      const product = await this.store.registerProduct(identifier.id, identifier.type);
      if (product && product.id) {
        this.addOrReplace(product);
      }
      else {
        console.error(`The product ${identifier.id} doesn't exists.`);
      }
    }

    this._products.sort((a, b) => StringHelper.compare(a.id, b.id));
  }
}
