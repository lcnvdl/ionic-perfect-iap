import { UserAccountService } from './services/user-account.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicPerfectIapService, FakeStore } from 'ionic-perfect-iap';
import { TestingProducts } from './products/testing-products';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private userAccount: UserAccountService,
    private changeDetector: ChangeDetectorRef,
    private iap: InAppPurchase2,
    private perfectIap: IonicPerfectIapService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.perfectIap.verbose = true;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      //  Start store
      const store = new FakeStore(TestingProducts.getTestingProducts(), [], true);
      await this.perfectIap.initialize(store, TestingProducts.generateRegisteredProducts(this.iap));

      this.perfectIap.purchased("no_ads").then(() => {
        this.userAccount.ads = false;
        this.changeDetector.detectChanges();
      });

      this.perfectIap.purchased("gold").then(() => {
        this.userAccount.gold += 100;
        this.changeDetector.detectChanges();
      });

      this.perfectIap.purchased("subscription").then(() => {
        this.userAccount.subscription = true;
        this.changeDetector.detectChanges();
      });

      console.log("Store initialized", this.perfectIap.products);

      //  Hide splash
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
