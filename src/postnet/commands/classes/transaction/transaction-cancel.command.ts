import { stringToCommand } from '../../../../utils/command-parser.util';
import { PostnetCommand } from '../../interfaces/postnet-command.interface';

/**
 * [prncancel] Cancellation of transaction or printout
 */
export class TransactionCencelCommand implements PostnetCommand {
  allias = 'trcancel';

  validate(): boolean {
    return true;
  }

  execute() {
    return stringToCommand(this.allias);
  }
}
