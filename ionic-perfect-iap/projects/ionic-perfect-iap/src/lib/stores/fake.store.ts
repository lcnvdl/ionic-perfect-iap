import { IStore } from './store.interface';
import { IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { Observable } from 'rxjs';

function runAsync<T>(m) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const r = m();
        resolve(r);
      }
      catch (err) {
        reject(err);
      }
    }, 1);
  }) as Promise<T>;
}

export class FakeStore implements IStore {

  private initialList = [];
  private verifiedList = [];

  constructor(public testingProducts: any[], public purchased: string[] = []) {
    this.initialList.push(...purchased);
  }

  registerProduct(id: string, type: string): Promise<IAPProduct> {
    const product = this.testingProducts.find(m => m.id === id);

    return runAsync<IAPProduct>(() => {
      if (!product) {
        return Promise.resolve(null);
      }
      else {
        return Promise.resolve(product);
      }
    });
  }

  order(id: string): Promise<IAPProduct> {
    return new Promise(async (resolve, reject) => {
      const result = confirm("Do you want to buy?");
      if (result) {
        this.purchased.push(id);
        resolve({} as any);
      }
      else {
        reject("Cancelled");
      }
    });
  }

  ready(): Promise<any> {
    return Promise.resolve();
  }

  owned(id: string): Observable<IAPProduct> {
    return new Observable(observer => {
      if (this.initialList.some(m => m === id)) {
        observer.next({ id } as any);
        observer.complete();
      }
    });
  }

  approved(id: string): Observable<IAPProduct> {
    return new Observable(observer => {
      const interval = setInterval(() => {
        if (this.purchased.some(m => m === id)) {
          observer.next({
            id,
            verify: () => {
              this.verifiedList.push(id);
            }
          } as any);
          observer.complete();
          clearInterval(interval);
        }
      }, 100);
    });
  }

  verified(id: string): Observable<IAPProduct> {
    return new Observable(observer => {
      const interval = setInterval(() => {
        if (this.verifiedList.some(m => m === id)) {
          observer.next({ id } as any);
          observer.complete();
          clearInterval(interval);
        }
      }, 100);
    });
  }

  refresh() {
  }
}
