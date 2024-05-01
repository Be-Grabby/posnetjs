import { stringToCommand } from '../../../../utils/command-parser.util';
import { PostnetCommand } from '../../interfaces/postnet-command.interface';

export enum PaymentFormType {
  CASH = 0,
  CARD = 2,
  CHECK = 3,
  GIFT_VOUCHER = 4,
  CREDIT = 5,
  OTHER = 6,
  VOUCHER = 7,
  CLIENT_ACCOUNT = 8,
}

export interface TransactionPaymentPayload {
  /**
   * Payment form type
   * Command: ty
   */
  type: PaymentFormType;
  /**
   * Payment value or change value – depending on re parameter. As in trline command
   * Command: wa
   */
  value: number;
  /**
   * Payment form NO alphanum. Up to 25 characters. Default empty.
   * Command: na
   */
  form?: string;
  /**
   * Change flag NO BOOL 0 – payment form 1 – change payment
   * Command: re
   */
  change?: boolean;
}

/**
 * [trpayment] [trpayment] Payment form in transaction
 *
 * 1. Currency can not be a payment form type
 * 2. Payment form sum covering the value to be paid must be sent.
 * 3. Availability in read only mode: NO
 */
export class TransactionPaymentCommand implements PostnetCommand {
  allias = 'trpayment';

  validate(): boolean {
    return true;
  }

  constructor(private options: TransactionPaymentPayload) {}

  execute() {
    return stringToCommand(this.allias, {
      ty: this.options.type,
      wa: this.options.value,
      na: this.options.form,
      re: this.options.change ? 1 : 0,
    });
  }
}
