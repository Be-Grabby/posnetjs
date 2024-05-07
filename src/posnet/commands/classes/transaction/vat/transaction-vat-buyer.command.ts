import { stringToCommand } from '../../../../../utils/command-parser.util';
import { PosnetCommand } from '../../../interfaces/posnet-command.interface';

export interface TransactionVatBuyerPayload {
  /**
   * alphanum. Up to 20 characters
   * Command: ni
   */
  nipNumber: string;

  /**
   * alphanum. The field may be composed of 3 lines separated by LF character. The lengths of line should be adjusted to printing mechanism. Redundant characters are cut.
   * Command: na
   */
  purchaserName: string;

  // /**
  //  * ???
  //  * Command: sc
  //  */
  // sc?: string;
}

/**
 * [trfvinit] Vat invoice intialization
 * Remarks:
 * 1. Transaction initialization can be performed only if there is no possibility to overflow current daily totalizers (it means if it is possible to print VAT invoice with maximum total value).
 * 2. Availability in read only mode: NO
 */
export class TransactionVatBuyerCommand implements PosnetCommand {
  allias = 'trfvinit';

  validate(): boolean {
    if (!this.options.nipNumber.length || this.options.nipNumber.length > 20) {
      throw new Error('NIP number must be between 1 and 20 characters');
    }

    if (!this.options.purchaserName.length) {
      throw new Error('Purchaser name must be provided');
    }

    return true;
  }

  constructor(private options: TransactionVatBuyerPayload) {}

  execute() {
    return stringToCommand(this.allias, {
      ni: this.options.nipNumber,
      na: this.options.purchaserName,
      sc: 1, // TODO: What is this?
    });
  }
}
