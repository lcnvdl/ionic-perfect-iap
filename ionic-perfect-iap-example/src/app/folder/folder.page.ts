import { UserAccountService } from './../services/user-account.service';
import { IonicPerfectIapService } from 'ionic-perfect-iap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  constructor(
    public userAccount: UserAccountService,
    private perfectIap: IonicPerfectIapService,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
  }

  get products() {
    return this.perfectIap.products;
  }

  purchase(product) {
    this.perfectIap.buy(product);
  }
}
