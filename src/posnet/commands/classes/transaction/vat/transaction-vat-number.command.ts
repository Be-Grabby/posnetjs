import { stringToCommand } from '../../../../../utils/command-parser.util';
import { PosnetCommand } from '../../../interfaces/posnet-command.interface';

export interface TransactionVatNmberPayload {
  /**
   * alphanum. Up to 15 characters
   * Command: nb
   */
  invoiceNumber: string;


  // /**
  //  * alphanum.
  //  * Command: sc
  //  */
  // sc: string;
}

/**
 * [trfvnumber] ?? not documented
 */
export class TransactionVatNumber implements PosnetCommand {
  allias = 'trfvnumber';

  validate(): boolean {
    if (!this.options.invoiceNumber.length || this.options.invoiceNumber.length > 15) {
      throw new Error('Invoice number must be between 1 and 15 characters');
    }

    return true;
  }

  constructor(private options: TransactionVatNmberPayload) {}

  execute() {
    return stringToCommand(this.allias, {
      nb: this.options.invoiceNumber,
      sc: 0, // TODO: What is this?
    });
  }
}
