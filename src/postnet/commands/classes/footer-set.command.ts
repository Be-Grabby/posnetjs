import { stringToCommand } from '../../../utils/command-parser.util';
import { PostnetCommand } from '../interfaces/postnet-command.interface';

/**
 * Programming information lines in footer
 *
 * Input:
 * Name   Description                               Required      Type          Remarks
 * tx     Content of information lines in footer    YES           Alphanum.     Regulations allow printing 3 additional information lines at the end of a receipt.
 * lb     Print on all receipts?                    NO            BOOL          Default false.
            false – only on the following one
            true – on all receipts
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
      line. Maximum line length is 40 characters. LF character (0Ah) separates the lines.
 * 5. In one line up to three formatting characters can be used.
 * 6. Between tow daily reports it is possible to send and store up to 25 different lines.
 * 7. Availability in read only mode: NO
 */
export class FooterSetCommand implements PostnetCommand {
  allias = 'ftrinfoset';

  constructor(private payload: { text: string; printOnAllReceipts?: boolean }) {}

  validate(): boolean {
    if (!this.payload.text) {
      throw ({
        message: 'Footer text is required.',
      });
    }

    return true;
  }

  execute() {
    return stringToCommand(this.allias, { tx: this.payload.text });
  }
}
