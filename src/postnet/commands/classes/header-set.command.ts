import { stringToCommand } from '../../../utils/command-parser.util';
import { PostnetCommand } from '../interfaces/postnet-command.interface';

/**
 * Header programming
 *
 * Input:
 * tx | Header Content | Alphanum. | It may contain formatting characters.
 *
 * Remarks:
 * 1. Maximum header length – 500 characters (including formatting characters).
 * 2. Formatting characters:
 *    &b – bold font
 *    &c – text centering
 *    &h – double height
 *    &u – underlined font
 *    &w – double width
 * 3. In the current version &w and &b are suitable for the same text format.
 * 4. '&' character is obtained by &&.
 * 5. Formatting characters should be placed at the beginning of the line. They are valid until the end of line.
 * In one line up to three formatting characters can be placed. The maximum line length is 40 characters –
 * for standard, double height, italics and underlined characters. For double width characters the maximum
 * line length is 20 characters. LF character (0Ah) separates the lines.
 * 6. Availability in read only mode: NO
 */
export class HeaderSetCommand implements PostnetCommand {
  allias = 'hdrset';

  constructor(private text: string) {}

  validate(): boolean {
    if (!this.text) {
      throw new Error('Header text is required');
    }

    return true;
  }

  execute() {
    return stringToCommand(this.allias, { tx: this.text });
  }
}
