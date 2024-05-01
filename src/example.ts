import { PaymentFormType, Postnet, TransactionManager } from './postnet';

(async () => {
  const postnet = new Postnet({
    path: '/dev/tty.usbmodem92138719931',
    debug: {
      send: true,
    },
  });

  const transactionManager = new TransactionManager(postnet);

  await transactionManager.execute({
    products: [{
      name: 'Coca-Cola 2L',
      unitPrice: 1000,
      totalAmount: 2000,
      quantity: 2,
      vatRate: 0,
    }, {
      name: 'Wristband',
      unitPrice: 500,
      totalAmount: 500,
      quantity: 1,
      vatRate: 0,
    }, {
      name: '2h Cable ride',
      unitPrice: 12000,
      totalAmount: 12000,
      quantity: 1,
      vatRate: 0,
    }],
    payments: [{
      type: PaymentFormType.CARD,
      value: 14500,
      form: 'CARD',
    }],
    end: {
      total: 14500,
    }
  });
})();
