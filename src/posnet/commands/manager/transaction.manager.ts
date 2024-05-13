import { Posnet } from '../../posnet';
import { TransactionEndCommand, TransactionEndPayload } from '../classes/transaction/transaction-end.command';
import { TransactionInitCommand } from '../classes/transaction/transaction-init.command';
import { TransactionLineCommand, TransactionLinePayload } from '../classes/transaction/transaction-line.command';
import { TransactionPaymentCommand, TransactionPaymentPayload } from '../classes/transaction/transaction-payment.command';
import { TransactionVatInitCommand, TransactionVatInitPayload } from '../classes/transaction/vat/transaction-vat-init.command';

export interface Transaction {
  products: TransactionLinePayload[];
  payments: TransactionPaymentPayload[];
  buyer?: TransactionVatInitPayload;
  end: TransactionEndPayload;
}

export class TransactionManager {
  constructor(private posnet: Posnet) {}

  validate(transaction: Transaction) {
    return true;
  }

  async execute(transaction: Transaction) {
    this.validate(transaction);

    if (transaction.buyer) {
      await this.posnet.execute(new TransactionVatInitCommand(transaction.buyer));
    } else {
      await this.posnet.execute(new TransactionInitCommand({
        blockMode: true,
      }));
    }

    for (const product of transaction.products) {
      await this.posnet.execute(new TransactionLineCommand(product));
    }

    if (!transaction.end.valuePaymentForms && transaction.payments.length > 0 && !transaction.buyer) {
      transaction.end.valuePaymentForms = transaction.payments.reduce((acc, payment) => acc + payment.value, 0);
    } else if (transaction.buyer) {
      delete transaction.end.valuePaymentForms;
    }

    // Payment info for B2B invoice is on the buyer info
    if (!transaction.buyer) {
      for (const payment of transaction.payments) {
        await this.posnet.execute(new TransactionPaymentCommand(payment));
      }
    }


    await this.posnet.execute(new TransactionEndCommand(transaction.end));
  }
}
