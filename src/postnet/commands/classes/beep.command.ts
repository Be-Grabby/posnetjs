import { stringToCommand } from '../../../utils/command-parser.util';
import { PostnetCommand } from '../interfaces/postnet-command.interface';

export class BeepCommand implements PostnetCommand {
  allias = 'beep';

  validate(): boolean {
    return true;
  }

  execute() {
    return stringToCommand(this.allias);
  }
}
