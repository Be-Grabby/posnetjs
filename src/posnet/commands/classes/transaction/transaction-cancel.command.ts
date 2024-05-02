import { stringToCommand } from '../../../../utils/command-parser.util';
import { PosnetCommand } from '../../interfaces/posnet-command.interface';

/**
 * [prncancel] Cancellation of transaction or printout
 */
export class TransactionCencelCommand implements PosnetCommand {
  allias = 'trcancel';

  validate(): boolean {
    return true;
  }

  execute() {
    return stringToCommand(this.allias);
  }
}
