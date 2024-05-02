import { stringToCommand } from '../../../../utils/command-parser.util';
import { PosnetCommand } from '../../interfaces/posnet-command.interface';

export interface TransactionFreedataPayload {
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
export class TransactionFreedataCommand implements PosnetCommand {
  allias = 'trfvfreedata';

  validate(): boolean {
    return true;
  }

  constructor(private options: TransactionFreedataPayload) {}

  execute() {
    return stringToCommand(this.allias, {
      tx: this.options.text,
      wa: this.options.sc,
    });
  }
}
