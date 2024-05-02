import { stringToCommand } from '../../../../utils/command-parser.util';
import { PosnetCommand } from '../../interfaces/posnet-command.interface';

export interface TransactionEndPayload {
  /**
   * Fiscal value of the transaction Up to 9999999999
   * Command: to
   */
  total: number;
  /**
   * Value of sent positive containers (gave out) Up to 9999999999
   * Command: op
   */
  valueOut?: number;
  /**
   * Value of sent negative container (returned) Up to 9999999999
   * Command: om
   */
  valueReturned?: number;
  /**
   * Value of sent payment forms
   * Command: fp
   */
  valuePaymentForms?: number;
}

/**
 * [trend] End of transaction
 * Remarks:
 * 1. Fiscal value has to be equal with receipt fiscal value.
 * 2. Payment forms and container value has to be equal with already sent values.
 * 3. Sent values of payment form has to be equal to bigger than the amount to be paid.
 * 4. Passed change has to meet the requirement: PAYMENT_FORMS – CHANGE = TO_BE_PAID
 * 5. If sent payment forms exceed TO BE PAID amount and change was not passed, the device calculates the change itself.
 * 6. Availability in read only mode: NO
 */
export class TransactionEndCommand implements PosnetCommand {
  allias = 'trend';

  validate(): boolean {
    if (this.options.total && this.options.total > 9999999999) {
      throw ({
        message: 'Fiscal value must be less than 9999999999',
      });
    }

    if (this.options.valueOut && this.options.valueOut > 9999999999) {
      throw ({
        message: 'Value out must be less than 9999999999',
      });
    }

    if (this.options.valueReturned && this.options.valueReturned > 9999999999) {
      throw ({
        message: 'Value returned must be less than 9999999999',
      });
    }

    return true;
  }

  constructor(private options: TransactionEndPayload) {}

  execute() {
    return stringToCommand(this.allias, {
      to: this.options.total,
      op: this.options.valueOut,
      om: this.options.valueReturned,
      fp: this.options.valuePaymentForms,
    });
  }
}
