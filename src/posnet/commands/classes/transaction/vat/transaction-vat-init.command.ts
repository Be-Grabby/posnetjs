import { stringToCommand } from '../../../../../utils/command-parser.util';
import { PosnetCommand } from '../../../interfaces/posnet-command.interface';

export interface TransactionVatInitPayload {
  /**
   * alphanum. Up to 15 characters
   * Command: nb
   */
  invoiceNumber?: string;

  /**
   * alphanum. Up to 20 characters
   * Command: ni
   */
  nipNumber: string;

  /**
   * alphanum. The field may be composed of 3 lines separated by LF character. The lengths of line should be adjusted to printing mechanism. Redundant characters are cut.
   * Command: na
   */
  purchaserName?: string;

  /**
   * alphanum. Up to 16 characters
   * Command: pd
   */
  paymentDeadline?: string;

  /**
   * alphanum. Up to 20 characters
   * Command: pt
   */
  paymentForm?: string;

  /**
   * alphanum.
   * Command: sc
   */
  clientFullName?: string;

  /**
   * alphanum.
   * Command: ss
   */
  sellerFullName?: string;

  /**
   * Number of additional copies
   * Command: cc
   */
  additionalCopies?: number;

  /**
   * Printing fields of persons entitled to make and receive an invoice (true) / without printing (false)
   * Command: ps
   */
  printFields?: boolean;
}

/**
 * [trfvinit] Vat invoice intialization
 * Remarks:
 * 1. Transaction initialization can be performed only if there is no possibility to overflow current daily totalizers (it means if it is possible to print VAT invoice with maximum total value).
 * 2. Availability in read only mode: NO
 */
export class TransactionVatInitCommand implements PosnetCommand {
  allias = 'trfvinit';

  validate(): boolean {
    if (!this.options.invoiceNumber?.length || this.options.invoiceNumber?.length > 15) {
      throw new Error('Invoice number must be between 1 and 15 characters');
    }

    if (!this.options.nipNumber?.length || this.options.nipNumber?.length > 20) {
      throw new Error('NIP number must be between 1 and 20 characters');
    }

    if (!this.options.purchaserName?.length) {
      throw new Error('Purchaser name must be provided');
    }


    if (!this.options.paymentDeadline.length || this.options.paymentDeadline.length > 16) {
      throw new Error('Payment deadline must be between 1 and 16 characters');
    }

    if (!this.options.paymentForm?.length || this.options.paymentForm?.length > 20) {
      throw new Error('Payment form must be between 1 and 20 characters');
    }

    return true;
  }

  constructor(private options: TransactionVatInitPayload) {}

  execute() {
    return stringToCommand(this.allias, {
      nb: this.options.invoiceNumber,
      ni: this.options.nipNumber,
      na: this.options.purchaserName,
      pd: this.options.paymentDeadline,
      pt: this.options.paymentForm,
      sc: this.options.clientFullName,
      ss: this.options.sellerFullName,
      cc: this.options.additionalCopies,
      ps: this.options.printFields,
    });
  }
}
