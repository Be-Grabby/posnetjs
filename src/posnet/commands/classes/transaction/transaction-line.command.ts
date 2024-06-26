import { stringToCommand } from '../../../../utils/command-parser.util';
import { PosnetCommand } from '../../interfaces/posnet-command.interface';

export enum VatRate {
  VAT_23 = 0,
  VAT_8 = 1,
  VAT_5 = 2,
  VAT_0 = 3,
  VAT_0_ZWOLNIONA_E = 4,
  // VAT_?? = 5,
  // VAT_?? = 6,
}

export interface TransactionLinePayload {
  /**
   * Name of goods up to 40 characters
   * Command: na
   */
  name: string;
  /**
   * Vat rate - Rate number provided
   * Command: vt
   */
  vatRate: VatRate;
  /**
   * Total Amount in cents
   * Command: wa
   */
  totalAmount: number;
  /**
   * Unit Price in cents
   * Command: pr
   */
  unitPrice?: number;
  /**
   * Item cancellation flag: false-no cancellation, true – item cancellation
   * Command: st
   */
  cancellationFlag?: number;
  /**
   * Number of goods (Default 1,000)
   * Command: il
   */
  quantity?: number;
  /**
   * Goods description up to 35 characters
   * Command: op
   */
  description?: number;
  /**
   * Measure unit
   * Command: jm
   */
  measureUnit?: number;
  /**
   * Discount(true)/narzut(false)
   * Command: rd
   */
  discount?: {
    /**
     * Percent discount/surcharge value (0.01 – 99.99)
     * Command: rp
     */
    percentage?: number;
    /**
     * Amount discount/surcharge value
     * Discount can't exceed the value of goods. The total of surcharge and price of goods can not exceed the scope of wa parameter
     * Command: rw
     */
    total?: number;
  };
}

/**
 * [trline] Transaction Line
 */
export class TransactionLineCommand implements PosnetCommand {
  allias = 'trline';

  validate(): boolean {
    if (this.options.discount?.total && this.options.discount?.percentage) {
      throw {
        message: 'Discount can not have total and percentage at the same time',
      }
    }

    return true;
  }

  constructor(private options: TransactionLinePayload) {}

  execute() {
    return stringToCommand(this.allias, {
      na: this.options.name,
      vt: this.options.vatRate,
      pr: this.options.unitPrice,
      st: this.options.cancellationFlag,
      wa: this.options.totalAmount,
      il: this.options.quantity,
      op: this.options.description,
      jm: this.options.measureUnit,
      rd: this.options.discount ? 1 : undefined,
      rw: this.options.discount?.total,
      rp: this.options.discount?.percentage
    });
  }
}
