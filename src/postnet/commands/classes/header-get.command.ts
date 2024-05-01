import { commandToString, stringToCommand } from '../../../utils/command-parser.util';
import { PostnetCommand } from '../interfaces/postnet-command.interface';

/**
 * Header reading
 *
 * Response:
 * tx Header content - Alphanum.
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
export class HeaderGetCommand implements PostnetCommand {
  allias = 'hdrget';

  validate(): boolean {
    return true;
  }

  execute() {
    return stringToCommand(this.allias);
  }

  parse(message: Buffer) {
    const { params } = commandToString(message);

    return {
      text: params.tx
    };
  }
}
