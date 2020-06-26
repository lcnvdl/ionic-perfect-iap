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

  constructor(public testingProducts: any[], public purchased: string[] = [], public verbose = true) {
    this.initialList.push(...purchased);
  }

  registerProduct(id: string, type: string): Promise<IAPProduct> {
    const product = this.testingProducts.find(m => m.id === id);

    return runAsync<IAPProduct>(() => {
      if (!product) {
        this.verbose && console.warn("The product " + id + " doesn't exists");
        return null;
      }
      else {
        return product;
      }
    });
  }

  order(id: string): Promise<IAPProduct> {
    return new Promise(async (resolve, reject) => {
      const result = confirm("Do you want to buy?");
      if (result) {
        this.purchased.push(id);
        const product = this.getIndividualProduct(id);
        product.owned = true;
        resolve(product);
      }
      else {
        resolve();
      }
    });
  }

  ready(): Promise<any> {
    return Promise.resolve();
  }

  owned(id: string): Observable<IAPProduct> {
    return new Observable(observer => {
      if (this.initialList.some(m => m === id)) {
        const product = this.getIndividualProduct(id);
        product.owned = true;
        this.verbose && console.log("Owned", product);
        observer.next(product);
        observer.complete();
      }
    });
  }

  approved(id: string): Observable<IAPProduct> {
    return new Observable(observer => {
      const interval = setInterval(() => {
        if (this.purchased.some(m => m === id)) {
          clearInterval(interval);
          const product = this.getIndividualProduct(id);
          product.owned = true;
          product.verify = () => {
            this.verifiedList.push(id);
          };
          this.verbose && console.log("Approved", product);
          observer.next(product);
          observer.complete();
        }
      }, 100);
    });
  }

  verified(id: string): Observable<IAPProduct> {
    return new Observable(observer => {
      const interval = setInterval(() => {
        if (this.verifiedList.some(m => m === id)) {
          clearInterval(interval);
          const product = this.getIndividualProduct(id);
          product.owned = true;
          product.finish = () => { };
          this.verbose && console.log("Verified", product);
          observer.next(product);
          observer.complete();
        }
      }, 100);
    });
  }

  refresh() {
    this.verbose && console.log("Refresh");
  }

  private getIndividualProduct(id: string) {
    const product = JSON.parse(JSON.stringify(this.testingProducts.find(m => m.id === id)));
    return product;
  }
}
