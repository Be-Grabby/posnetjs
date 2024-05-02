import { Posnet } from '../../posnet';
import { TransactionEndCommand, TransactionEndPayload } from '../classes/transaction/transaction-end.command';
import { TransactionInitCommand } from '../classes/transaction/transaction-init.command';
import { TransactionLineCommand, TransactionLinePayload } from '../classes/transaction/transaction-line.command';
import { TransactionPaymentPayload } from '../classes/transaction/transaction-payment.command';

export interface Transaction {
  products: TransactionLinePayload[],
  payments: TransactionPaymentPayload[],
  end: TransactionEndPayload,
}

export class TransactionManager {
  constructor(private posnet: Posnet) {}

  validate(transaction: Transaction) {
    const totalPrice = transaction.products.reduce((acc, product) => acc + product.totalAmount, 0);
    const totalPaid = transaction.payments.reduce((acc, payment) => acc + payment.value, 0);

    if (totalPrice !== transaction.end.total) {
      throw ({
        message: 'Total price does not match the sum of the products',
      });
    }

    if (totalPaid !== transaction.end.total && transaction.payments.length > 0) {
      throw ({
        message: 'Total paid does not match the total price',
      });
    }

    return true;
  }

  async execute(transaction: Transaction) {
    this.validate(transaction);

    await this.posnet.execute(new TransactionInitCommand({
      blockMode: true,
    }));

    for (const product of transaction.products) {
      await this.posnet.execute(new TransactionLineCommand(product));
    }

    // await this.posnet.execute(new TransactionFreedataCommand({
    //   sc: 2,
    //   text: 'CARD',
    // }));

    // for (const payment of transaction.payments) {
    // }


    await this.posnet.execute(new TransactionEndCommand(transaction.end));
  }
}
