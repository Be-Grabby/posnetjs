import { BeepCommand, PaymentFormType, Posnet, TransactionManager } from './posnet';

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
    // await posnet.execute(new TransactionCencelCommand());


    const transactionManager = new TransactionManager(posnet);
    await transactionManager.execute({
      // buyer: {
      //   invoiceNumber: '251/FA/2024',
      //   nipNumber: 'B10777803',
      //   paymentDeadline: '2024-12-31',
      //   paymentForm: 'CASH / CARD',
      //   purchaserName: 'Grabby Innovations S.L\L04289 La Huelga, Almería',
      // },
      products: [{
        name: 'Test Product',
        unitPrice: 1,
        totalAmount: 1,
        quantity: 1,
        vatRate: 0,
        // discount: {
        //   total: 200,
        // },
      }],
      payments: [{
        value: 1,
        type: PaymentFormType.CARD,
      // }, {
      //   value: 800,
      //   type: PaymentFormType.CASH,
      }],
      end: {
        total: 1,
        valuePaymentForms: 1,
      }
    });
  } catch(error) {
    console.log('An error happened:');
    console.error(error);
  }
})();
