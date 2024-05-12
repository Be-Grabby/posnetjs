## Getting started

### Installing
Download from npm:
```
npm i --save posnetjs
```

### Make sure that the protocol is USB

The interface is selected in the printer menu.
```
Konfiguracja → 1 Parametry ogólne → 7 Funkcje komunik. → 1 Interfejs PC.
```

Example of usage:

```typescript
import { BeepCommand, PaymentFormType, Posnet, TransactionCencelCommand, TransactionManager } from './posnet';

(async () => {
  try {

    console.log('available devices: ', await Posnet.getAvailableDevices());

    const posnet = new Posnet({
      debug: {
        send: true,
        receive: true,
      },
    });

    await posnet.bootstrap();

    await posnet.execute(new BeepCommand());
    await posnet.execute(new TransactionCencelCommand());


    const transactionManager = new TransactionManager(posnet);
    await transactionManager.execute({
      buyer: {
        invoiceNumber: '251/FA/2024',
        nipNumber: 'B10777803',
        paymentDeadline: '2024-12-31',
        paymentForm: 'CASH / CARD',
        purchaserName: 'Grabby Innovations S.L\L04289 La Huelga, Almería',
      },
      products: [{
        name: 'Pepsi 2L',
        unitPrice: 1000,
        totalAmount: 2000,
        quantity: 2,
        vatRate: 0,
        discount: {
          total: 200,
        },
      }],
      payments: [{
        value: 1000,
        type: PaymentFormType.CARD,
      }, {
        value: 800,
        type: PaymentFormType.CASH,
      }],
      end: {
        total: 1800,
        valuePaymentForms: 1800,
      }
    });
  } catch(error) {
    console.log('An error happened:');
    console.error(error);
  }
})();


```

# Available commands
| Manager                              | Command                       | Description                                              | Class                                                                                                                                                                  |
|--------------------------------------|-------------------------------|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| -                                    | BeepCommand                   | Trigger a beep sound on kasa fiskalna                    | [beep.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/beep.command.ts)                                                         |
| -                                    | DisplayTextCommand            | Random information line on a display                     | [display-text.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/display-text.command.ts)                                         |
| -                                    | FooterGetCommand              | Reading of information lines in footer                   | [footer-get.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/footer-get.command.ts)                                             |
| -                                    | FooterSetCommand              | Programming information lines in footer                  | [footer-set.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/footer-set.command.ts)                                             |
| -                                    | HeaderGetCommand              | Header reading                                           | [header-get.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/header-get.command.ts)                                             |
| -                                    | HeaderSetCommand              | Header programming                                       | [header-set.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/header-set.command.ts)                                             |
| -                                    | StatusCommand                 | General status                                           | [status.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/status.command.ts)                                                     |
| -                                    | TotalizersStatusCommand       | Totalizers status                                        | [totalizers-status.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/totalizers-status.command.ts)                               |
| TransactionManager                   | -                             | Group of basic commands in order to create a transaction | [manager/transaction.manager.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/manager/transaction.manager.ts)                                   |
| TransactionManager                   | TransactionCencelCommand      | Cancellation of transaction or printout                  | [transaction/transaction-cancel.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-cancel.command.ts)     |
| TransactionManager                   | TransactionEndCommand         | End of transaction                                       | [transaction/transaction-end.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-end.command.ts)           |
| TransactionManager                   | TransactionInitCommand        | Transaction initialization                               | [transaction/transaction-init.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-init.command.ts)         |
| TransactionManager                   | TransactionLineCommand        | Transaction Line                                         | [transaction-line.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-line.command.ts)                     |
| TransactionManager                   | TransactionPaymentCommand     | Payment form in transaction                              | [transaction-payment.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-payment.command.ts)               |
| VAT - TransactionVatBuyerCommand     | TransactionVatBuyerCommand    | Vat invoice intialization                                | [transaction-vat-buyer.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/vat/transaction-vat-buyer.command.ts)       |
| VAT - TransactionVatFreedataCommand  | TransactionVatFreedataCommand | ??? not in the manual                                    | [transaction-vat-freedata.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/vat/transaction-vat-freedata.command.ts) |
| VAT - TransactionVatInitCommand      | TransactionVatInitCommand     | Vat invoice intialization                                | [transaction-vat-init.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/vat/transaction-vat-init.command.ts)         |
| VAT - TransactionVatNumber           | TransactionVatNumber          | ??? not in the manual                                    | [transaction-vat-number.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/vat/transaction-vat-number.command.ts)     |

## Developing
- Clone the repository
- Install dependencies (`npm install`)
- Run `example.ts` -> `npm run start`
