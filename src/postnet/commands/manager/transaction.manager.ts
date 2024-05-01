import { Postnet } from '../../postnet';
import { TransactionEndCommand, TransactionEndPayload } from '../classes/transaction/transaction-end.command';
import { TransactionInitCommand } from '../classes/transaction/transaction-init.command';
import { TransactionLineCommand, TransactionLinePayload } from '../classes/transaction/transaction-line.command';
import { TransactionPaymentCommand, TransactionPaymentPayload } from '../classes/transaction/transaction-payment.command';

export interface Transaction {
  products: TransactionLinePayload[],
  payments: TransactionPaymentPayload[],
  end: TransactionEndPayload,
}

export class TransactionManager {
  constructor(private postnet: Postnet) {}

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

    await this.postnet.execute(new TransactionInitCommand({
      blockMode: true,
    }));

    for (const product of transaction.products) {
      await this.postnet.execute(new TransactionLineCommand(product));
    }

    for (const payment of transaction.payments) {
      await this.postnet.execute(new TransactionPaymentCommand(payment));
    }


    await this.postnet.execute(new TransactionEndCommand(transaction.end));
  }
}
