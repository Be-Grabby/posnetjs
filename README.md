## Getting started

### Installing
Download from npm:
```
npm i --save posnetjs
```

Example of usage:

```typescript
import { BeepCommand, PaymentFormType, Posnet, TransactionManager } from './posnet';

(async () => {
  const posnet = new Posnet({
    debug: {
      send: true,
    },
  });

  posnet.execute(new BeepCommand());

  const transactionManager = new TransactionManager(posnet);

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

# Available commands
| Manager            | Command                   | Description                                              | Class                                                                                                                  |
|--------------------|---------------------------|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| -                  | BeepCommand               | Trigger a beep sound on kasa fiskalna                    | [beep.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/beep.command.ts)         |
| -                  | FooterGetCommand          | Reading of information lines in footer                   | [footer-get.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/footer-get.command.ts) |
| -                  | FooterSetCommand          | Programming information lines in footer                  | [footer-set.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/footer-set.command.ts) |
| -                  | HeaderGetCommand          | Header reading                                           | [header-get.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/header-get.command.ts) |
| -                  | HeaderSetCommand          | Header programming                                       | [header-set.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/header-set.command.ts) |
| -                  | StatusCommand             | General status                                           | [status.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/status.command.ts)       |
| -                  | TotalizersStatusCommand   | Totalizers status                                        | [totalizers-status.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/totalizers-status.command.ts) |
| TransactionManager | -                         | Group of basic commands in order to create a transaction | [manager/transaction.manager.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/manager/transaction.manager.ts) |
| TransactionManager | TransactionCencelCommand  | Cancellation of transaction or printout                  | [transaction/transaction-cancel.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-cancel.command.ts) |
| TransactionManager | TransactionEndCommand     | End of transaction                                       | [transaction/transaction-end.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-end.command.ts) |
| TransactionManager | TransactionInitCommand    | Transaction initialization                               | [transaction/transaction-init.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-init.command.ts) |
| TransactionManager | TransactionLineCommand    | Transaction Line                                         | [transaction-line.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-line.command.ts) |
| TransactionManager | TransactionPaymentCommand | Payment form in transaction                              | [transaction-payment.command.ts](https://github.com/Be-Grabby/posnetjs/blob/main/src/posnet/commands/classes/transaction/transaction-payment.command.ts) |

## Developing
- Clone the repository
- Install dependencies (`npm install`)
- Run `example.ts` -> `npm run start`
