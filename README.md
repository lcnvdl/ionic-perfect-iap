# ionic-perfect-iap
Easy in app purchases implementation.

## Requirements
If you are using Cordova:
```bash
ionic cordova plugin add cordova-plugin-purchase --save
npm i @ionic-native/in-app-purchase-2 --save
```

If you are using Capacitor:
```bash
npm i cordova-plugin-purchase --save
npm i @ionic-native/in-app-purchase-2 --save
```

Then, in app modules:
```ts
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { IonicPerfectIapService } from "ionic-perfect-iap";

@NgModule({
    providers: [
        InAppPurchase2,
        IonicPerfectIapService
    ]
});
```

## Getting Started
```bash
npm i --save ionic-perfect-iap
```

