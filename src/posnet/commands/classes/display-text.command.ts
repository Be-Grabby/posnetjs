import { stringToCommand } from '../../../utils/command-parser.util';
import { PosnetCommand } from '../interfaces/posnet-command.interface';

export interface DisplayTextPayload {

  /**
   * id Display Id YES Num. 0 – client's display 1 – operator's display
   * Command: id
   */
  displayId: number;

  /**
   * Line number YES Num. Lines numbered from zero
   * Command: no
   */
  lineNumber: number;

  /**
   * Line content YES Alphanum. Up to 20 characters
   * Command: ln
   */
  lineContent: string;
}

/**
 * [dsptxtline] Random information line on a display
 * 1. Sending a sequence to the display in course of transaction or before 45 sec. after its finish results in buffering operations (it will be performed when possible).
 * 2. For LED display the sequence is ignored.
 * 3. When the display of the operator and the client is shared, sequences on operator's display are ignored.
 * 4. Between two daily reports it is possible to sent up to 40 lines to the client's display.
 * 5. Availability in read only mode: NO
 */
export class DisplayTextCommand implements PosnetCommand {
  allias = 'dsptxtline';


  constructor(private options: DisplayTextPayload) {}

  validate(): boolean {
    if (this.options.lineContent.length > 20) {
      throw new Error('Line content must be up to 20 characters');
    }

    return true;
  }

  execute() {
    return stringToCommand(this.allias, {
      id: this.options.displayId,
      no: this.options.lineNumber,
      ln: this.options.lineContent,
    });
  }
}
