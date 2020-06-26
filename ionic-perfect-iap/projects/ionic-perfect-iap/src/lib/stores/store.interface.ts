import { IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { Observable } from 'rxjs';

export interface IStore {
  registerProduct(id: string, type: string): Promise<IAPProduct>;
  order(id: string): Promise<IAPProduct>;
  ready(): Promise<any>;
  owned(id: string): Observable<IAPProduct>;
  approved(id: string): Observable<IAPProduct>;
  verified(id: string): Observable<IAPProduct>;
  refresh();
}
