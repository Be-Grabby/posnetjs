## Getting started

### Installing
Download from npm:
```
npm i --save postnetjs
```

Example of usage:

```typescript
import { PaymentFormType, Postnet, TransactionManager } from './postnet';

(async () => {
  const postnet = new Postnet({
    path: '<postent device serial port>',
    debug: {
      send: true,
    },
  });

  const transactionManager = new TransactionManager(postnet);

  await transactionManager.execute({
    products: [{
      name: 'Product A',
      unitPrice: 1000,
      totalAmount: 2000,
      quantity: 2,
      vatRate: 0,
    }, {
      name: 'Product B',
      unitPrice: 500,
      totalAmount: 500,
      quantity: 1,
      vatRate: 0,
    }, {
      name: 'Product C',
      unitPrice: 12000,
      totalAmount: 12000,
      quantity: 1,
      vatRate: 0,
    }],
    payments: [{
      type: PaymentFormType.CARD,
      value: 14500,
      form: 'CARD',
    }],
    end: {
      total: 14500,
    }
  });
})();

```


### Looking for the device

List all devices in serial port:
```
ls /dev/tty.*
```

## Developing
- Clone the repository
- Install dependencies (`npm install`)
- Run `example.ts` -> `npm run start`
