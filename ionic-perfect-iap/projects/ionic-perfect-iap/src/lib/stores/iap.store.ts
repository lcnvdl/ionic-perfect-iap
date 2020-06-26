import { InAppPurchase2, IAPProduct, IAPProducts } from '@ionic-native/in-app-purchase-2/ngx';
import { IStore } from "./store.interface";
import { Observable } from 'rxjs';

export class IAPStore implements IStore {
  constructor(private store: InAppPurchase2, debug = false) {
    this.store.verbosity = debug ? this.store.DEBUG : this.store.INFO;
  }

  registerProduct(id: string, type: string): Promise<IAPProduct> {
    return new Promise((resolve, reject) => {
      this.store.when(id).registered(m => {
        resolve(m);
      });

      try {
        this.store.register({ id, type });
      }
      catch (err) {
        reject(err);
      }
    });
  }

  order(id: string): Promise<IAPProduct> {
    return new Promise((resolve, reject) => {
      this.store.order(id).then(m => resolve(m), err => reject(err));
    });
  }

  ready(): Promise<IAPProducts> {
    return new Promise((resolve, reject) => {
      this.store.ready(m => {
        resolve(this.store.products);
      });
    });
  }

  owned(id: string): Observable<IAPProduct> {
    return new Observable(observer => {
      this.store.when(id).owned(p => {
        observer.next(p);
      });
    });
  }

  approved(id: string): Observable<IAPProduct> {
    return new Observable(observer => {
      this.store.when(id).approved(p => {
        observer.next(p);
      });
    });
  }

  verified(id: string): Observable<IAPProduct> {
    return new Observable(observer => {
      this.store.when(id).verified(p => {
        observer.next(p);
      });
    });
  }

  refresh() {
    this.store.refresh();
  }
}
