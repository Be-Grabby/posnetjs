import { commandToString, stringToCommand } from '../../../utils/command-parser.util';
import { PosnetCommand } from '../interfaces/posnet-command.interface';

/**
 * Totalizers status
 * Availability in read only mode: YES
 *
 * Response:
 * no Number of the next daily report - Num.
 * fa Invoice totalizer in A rate - Totalizer
 * fb Invoice totalizer in B rate - Totalizer
 * fc Invoice totalizer in C rate - Totalizer
 * fd Invoice totalizer in D rate - Totalizer
 * fe Invoice totalizer in E rate - Totalizer
 * ff Invoice totalizer in F rate - Totalizer
 * fg Invoice totalizer in G rate - Totalizer
 * fn Invoice counter - Num.
 * pa Receipt totalizer in A rate - Totalizer
 * pb Receipt totalizer in B rate - Totalizer
 * pc Receipt totalizer in C rate - Totalizer
 * pd Receipt totalizer in D rate - Totalizer
 * pe Receipt totalizer in E rate - Totalizer
 * pf Receipt totalizer in F rate - Totalizer
 * pg Receipt totalizer in G rate - Totalizer
 * pn Recepit counter - Num.
 * ct Canceled receipts totalizer - Totalizer
 * cn Canceled receipt counter - Num.
 * cc Number of changes in goods data base - Num.
 *
 * rule for var:
 *    Correct values of percentage are 0..99,99.
 *    It always sent all 7 VAT rates.
 *    All values contain comma.
 *    101,00 – inactive VAT rate
 *    100,00 – exempted VAT rate
 *
 * va VAT A rate value - Num.
 * vb VAT B rate value - Num.
 * vc VAT C rate value - Num.
 * vd VAT D rate value - Num.
 * ve VAT E rate value - Num.
 * vf VAT F rate value - Num.
 * vg VAT G rate value - Num.
 */
export class TotalizersStatusCommand implements PosnetCommand {
  allias = 'stot';

  validate(): boolean {
    return true;
  }

  execute() {
    return stringToCommand(this.allias);
  }

  parse(message: Buffer) {
    const { params } = commandToString(message);

    return {
      nextDailyReport: params.no,
      invoiceTotalizerA: params.fa,
      invoiceTotalizerB: params.fb,
      invoiceTotalizerC: params.fc,
      invoiceTotalizerD: params.fd,
      invoiceTotalizerE: params.fe,
      invoiceTotalizerF: params.ff,
      invoiceTotalizerG: params.fg,
      invoiceCounter: params.fn,
      receiptTotalizerA: params.pa,
      receiptTotalizerB: params.pb,
      receiptTotalizerC: params.pc,
      receiptTotalizerD: params.pd,
      receiptTotalizerE: params.pe,
      receiptTotalizerF: params.pf,
      receiptTotalizerG: params.pg,
      receiptCounter: params.pn,
      canceledReceiptsTotalizer: params.ct,
      canceledReceiptCounter: params.cn,
      changesInGoodsDataBase: params.cc,
      vatA: params.va,
      vatB: params.vb,
      vatC: params.vc,
      vatD: params.vd,
      vatE: params.ve,
      vatF: params.vf,
      vatG: params.vg,
    }
  }
}
