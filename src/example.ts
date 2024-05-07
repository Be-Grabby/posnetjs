import { BeepCommand, PaymentFormType, Posnet, TransactionCencelCommand, TransactionManager } from './posnet';

(async () => {
  try {

    console.log('available devices: ', await Posnet.getAvailableDevices());

    const posnet = new Posnet({
      debug: {
        send: true,
        // receive: true,
      },
    });

    await posnet.bootstrap();

    await posnet.execute(new BeepCommand());
    await posnet.execute(new TransactionCencelCommand());


    const transactionManager = new TransactionManager(posnet);
    await transactionManager.execute({
      buyer: {
        invoiceNumber: '251/FA/2024',
        nipNumber: 'B10777803',
        paymentDeadline: '2024-12-31',
        paymentForm: 'CASH / CARD',
        purchaserName: 'Grabby Innovations S.L\L04289 La Huelga, Almería',
      },
      products: [{
        name: 'Pepsi 2L',
        unitPrice: 1000,
        totalAmount: 2000,
        quantity: 2,
        vatRate: 0,
        discount: {
          total: 200,
        },
      }],
      payments: [{
        value: 1000,
        type: PaymentFormType.CARD,
      }, {
        value: 800,
        type: PaymentFormType.CASH,
      }],
      end: {
        total: 1800,
        valuePaymentForms: 1800,
      }
    });
  } catch(error) {
    console.log('An error happened:');
    console.error(error);
  }
})();
