import { stringToCommand } from '../../../../utils/command-parser.util';
import { PosnetCommand } from '../../interfaces/posnet-command.interface';

export interface TransactionInitPayload {
  /**
   * Block mode enables enables sending at least 100 selling items with discount and item description in an initiated transaction.
   *
   * command: bm
   */
  blockMode?: boolean;
}

/**
 * [trinit] Transaction initialization
 */
export class TransactionInitCommand implements PosnetCommand {
  allias = 'trinit';

  validate(): boolean {
    return true;
  }

  constructor(private options: TransactionInitPayload) {}

  execute() {
    return stringToCommand(this.allias, {
      bm: this.options.blockMode ? 1 : 0,
    });
  }
}
