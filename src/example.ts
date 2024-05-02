import { BeepCommand, PaymentFormType, Posnet, TransactionCencelCommand, TransactionManager } from './posnet';

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

    posnet.execute(new BeepCommand());
    posnet.execute(new TransactionCencelCommand());

    const transactionManager = new TransactionManager(posnet);
    await transactionManager.execute({
      products: [{
        name: 'Coca Cola 2L',
        unitPrice: 1000,
        totalAmount: 1000,
        quantity: 1,
        vatRate: 0,
      }],
      payments: [{
        value: 1000,
        type: PaymentFormType.CARD,
      }],
      end: {
        total: 1000,
      }
    });
  } catch(error) {
    console.log('An error happened:');
    console.error(error);
  }
})();
