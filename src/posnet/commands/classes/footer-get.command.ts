import { commandToString, stringToCommand } from '../../../utils/command-parser.util';
import { PosnetCommand } from '../interfaces/posnet-command.interface';

/**
 * Reading of information lines in footer
 *
 * Response:
 * Name   Description                                                                         Required      Type          Remarks
 * tx     Content of information lines in footer. Lines are separated by LF character (0Ah).  YES            Alphanum.    Regulations allow printing 3 additional information lines at the end of a receipt.
 *
 * Remarks:
 * 1. Formatting characters:
 *    &b – bold font
 *    &c – text centering
 *    &h – double height
 *    &u – underlined font
 *    &w – double width
 * 2. In the current version &w and &b are suitable for the same text format.
 * 3. '&' character is obtained by &&.
 * 4. Formatting characters should be placed at the beginning of the line. They are valid until the end of the
 * line. Maximum line length is 40 characters. LF character (0Ah) separates the lines.
 * 5. Availability in read only mode: YES
 */
export class FooterGetCommand implements PosnetCommand {
  allias = 'ftrinfoget';

  validate(): boolean {
    return true;
  }

  execute() {
    return stringToCommand(this.allias);
  }

  parse(message: Buffer) {
    const { params } = commandToString(message);

    console.log('params', params);

    return {
      text: params.tx
    };
  }
}
