import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  public ads = true;
  public gold = 0;
  public subscription = false;

  constructor() { }
}
