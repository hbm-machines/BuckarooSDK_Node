import buckarooClientTest from '../BuckarooClient.test';
import { IPay } from '../../src/PaymentMethods/Afterpay/Model/Pay';
import { getIPAddress, RecipientCategory, uniqid } from '../../src';

const paymentPayload: IPay = {
    invoice: uniqid(),
    clientIP: getIPAddress(),
    amountDebit: 100,
    billing: {
        recipient: {
            category: RecipientCategory.PERSON,
            firstName: 'Test',
            lastName: 'Acceptatie',
            birthDate: '01-01-1990',
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '80',
            zipcode: '8441ER',
            city: 'Heerenveen',
            country: 'NL',
        },
        email: 'test@buckaroo.nl',
        phone: {
            mobile: '0612345678',
            landline: '0201234567',
        },
    },
    articles: [
        {
            vatPercentage: 21,
            price: 10,
            description: 'Test',
            quantity: 4,
            identifier: 'test',
        },
    ],
};

const method = buckarooClientTest.method('afterpay');
describe('AfterPay methods', () => {
    test('Pay', () => {
        return method.pay(paymentPayload).then((data) => {
            expect(data.isSuccess()).toBeTruthy();
        });
    });
    test('Refund', async () => {
        await method
            .refund({
                invoice: paymentPayload.invoice, //Set invoice number of the transaction to refund
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', //Set transaction key of the transaction to refund
                amountCredit: paymentPayload.amountDebit,
            })
            .then((data) => {
                expect(data.isFailed()).toBeDefined();
            });
    });
    test('Authorize', async () => {
        await method.authorize(paymentPayload).then((data) => {
            expect(data).toBeDefined();
        });
    });
    test('CancelAuthorize', async () => {
        await method
            .cancelAuthorize({
                invoice: paymentPayload.invoice,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountCredit: 100,
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });

    test('Capture', async () => {
        await method
            .capture({
                ...paymentPayload,
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
});
