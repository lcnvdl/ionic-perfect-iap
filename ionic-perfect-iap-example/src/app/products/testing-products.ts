import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';

export class TestingProducts {
    static getTestingProducts() {
        return [{
            id: "gold",
            title: "Gold",
            description: "Gold",
            canPurchase: true,
            owned: false
        }, {
            id: "no_ads",
            title: "Disable Ads",
            description: "Disable Ads",
            canPurchase: true,
            owned: false
        }, {
            id: "subscription",
            title: "Monthly Subscription",
            description: "Monthly Subscription",
            canPurchase: true,
            owned: false
        }];
    }

    static generateRegisteredProducts(iap: InAppPurchase2) {
        return [{
            id: "gold",
            type: iap.CONSUMABLE
        }, {
            id: "no_ads",
            type: iap.NON_CONSUMABLE
        }, {
            id: "subscription",
            type: iap.PAID_SUBSCRIPTION
        }];
    }
}
