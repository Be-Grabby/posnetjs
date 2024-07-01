import { BeepCommand, PaymentFormType, Posnet, TransactionCencelCommand, TransactionInvoiceType, TransactionManager } from './posnet';

(async () => {
  try {

    console.log('available devices: ', await Posnet.getAvailableDevices());

    const posnet = new Posnet({
      debug: {
        send: true,
        receive: true,
      },
    });

    await posnet.bootstrap();

    // await posnet.execute(new StatusCommand());
    await posnet.execute(new BeepCommand());
    // await posnet.execute(new DisplayTextCommand({
    //   displayId: 0,
    //   lineContent: '',
    //   lineNumber: 0,
    // }));
    await posnet.execute(new TransactionCencelCommand());


    const transactionManager = new TransactionManager(posnet);
    await transactionManager.execute({
      buyer: {
        // invoiceNumber: '251/FA/2024',
        nipNumber: 'B10777803',
        // paymentDeadline: '2024-12-31',
        // paymentForm: 'CASH / CARD',
        // purchaserName: 'Grabby Innovations S.L\L04289 La Huelga, Almería',
      },
      invoiceType: TransactionInvoiceType.SIMPLIFIED,
      products: [{
        name: 'wstep wakeboard',
        unitPrice: 10000,
        totalAmount: 20000,
        quantity: 2,
        vatRate: 1,
        // discount: {
        //   total: 200,
        // },
      }, {
        name: 'wstep wakeboard',
        unitPrice: 6500,
        totalAmount: 6500,
        quantity: 1,
        vatRate: 1,
        // discount: {
        //   total: 200,
        // },
      }, {
        name: 'wstep wakeboard',
        unitPrice: 8000,
        totalAmount: 8000,
        quantity: 1,
        vatRate: 1,
        // discount: {
        //   total: 200,
        // },
      }],
      payments: [{
        value: 34500,
        type: PaymentFormType.CASH,
      // }, {
      //   value: 800,
      //   type: PaymentFormType.CASH,
      }],
      end: {
        total: 34500,
        valuePaymentForms: 34500,
      }
    });
  } catch(error) {
    console.log('An error happened:');
    console.error(error);
  }
})();
