import { stringToCommand } from '../../../../../utils/command-parser.util';
import { PosnetCommand } from '../../../interfaces/posnet-command.interface';

export interface TransactionVatBuyerPayload {
  /**
   * alphanum. Up to 20 characters
   * Command: ni
   */
  nipNumber: string;
}

/**
 * [trfvbuyer] Vat invoice intialization
 * Remarks:
 * 1. Transaction initialization can be performed only if there is no possibility to overflow current daily totalizers (it means if it is possible to print VAT invoice with maximum total value).
 * 2. Availability in read only mode: NO
 */
export class TransactionVatBuyerCommand implements PosnetCommand {
  allias = 'trnipset';

  validate(): boolean {
    if (!this.options.nipNumber.length || this.options.nipNumber.length > 20) {
      throw new Error('NIP number must be between 1 and 20 characters');
    }

    return true;
  }

  constructor(private options: TransactionVatBuyerPayload) {}

  execute() {
    return stringToCommand(this.allias, {
      ni: this.options.nipNumber,
    });
  }
}
