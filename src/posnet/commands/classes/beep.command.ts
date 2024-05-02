import { stringToCommand } from '../../../utils/command-parser.util';
import { PosnetCommand } from '../interfaces/posnet-command.interface';

export class BeepCommand implements PosnetCommand {
  allias = 'beep';

  validate(): boolean {
    return true;
  }

  execute() {
    return stringToCommand(this.allias);
  }
}
