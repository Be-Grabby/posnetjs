import { commandToString, stringToCommand } from '../../../utils/command-parser.util';
import { PostnetCommand } from '../interfaces/postnet-command.interface';

/**
 * General status
 * Availability in read only mode: YES
 *
 * Response:
 * fs Cash register in fiscal mode? (Y/N)
 * tz Zero totalizers? (Y/N)
 * ts Initialized transaction mode. - Num.  0 – no transaction
 *                                          10h – receipt initialization
 *                                          11h – receipt in block mode
 *                                          21h – invoice initialization
 *                                          30h – container transaction initialization
 *                                          41h – VAT invoice verification
 * hr Header programmed (Y/N)
 * nu Fiscal memory id
 */
export class StatusCommand implements PostnetCommand {
  allias = 'scomm';

  validate(): boolean {
    return true;
  }

  execute() {
    return stringToCommand(this.allias);
  }

  parse(message: Buffer) {
    const { params } = commandToString(message);

    return {
      fiscalMode: params.fs === 'Y',
      zeroTotalizers: params.tz === 'Y',
      transactionMode: params.ts,
      headerProgrammed: params.hr === 'Y',
      fiscalMemoryId: params.nu,
    }
  }
}
