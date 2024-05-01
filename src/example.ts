import { Postnet, TransactionCencelCommand } from './postnet';

(async () => {
  try {
    const postnet = new Postnet({
      path: '/dev/tty.usbmodem92138719931',
      debug: {
        send: true,
      },
    });

    // const transactionManager = new TransactionManager(postnet);
    postnet.execute(new TransactionCencelCommand());

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
