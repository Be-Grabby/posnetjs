import { BeepCommand, Posnet, TransactionCencelCommand } from './posnet';

(async () => {
  try {

    console.log('available devices: ', await Posnet.getAvailableDevices());

    const posnet = new Posnet({
      debug: {
        send: true,
      },
    });

    await posnet.bootstrap();

    // const transactionManager = new TransactionManager(posnet);
    posnet.execute(new BeepCommand());
    posnet.execute(new TransactionCencelCommand());

  //   await transactionManager.execute({
  //     products: [{
  //       name: 'Coca Cola 2L',
  //       unitPrice: 1000,
  //       totalAmount: 1000,
  //       quantity: 1,
  //       vatRate: 0,
  //     }],
  //     payments: [],
  //     end: {
  //       total: 1000,
  //     }
  //   });
  } catch(error) {
    console.log('errrp!!');
    console.error(error);
  }
})();
