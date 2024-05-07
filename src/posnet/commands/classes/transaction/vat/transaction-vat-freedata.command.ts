import { stringToCommand } from '../../../../../utils/command-parser.util';
import { PosnetCommand } from '../../../interfaces/posnet-command.interface';

export interface TransactionVatFreedataPayload {
  /**
   * Text?
   * Command: tx
   */
  text: string;
  /**
   * No idea
   * Command: sc
   */
  sc: number;
}

/**
 * [trfvfreedata] ??? not in the manual
 */
export class TransactionVatFreedataCommand implements PosnetCommand {
  allias = 'trfvfreedata';

  validate(): boolean {
    return true;
  }

  constructor(private options: TransactionVatFreedataPayload) {}

  execute() {
    return stringToCommand(this.allias, {
      tx: this.options.text,
      wa: this.options.sc,
    });
  }
}
