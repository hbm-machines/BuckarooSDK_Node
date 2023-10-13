import buckarooClientTest from '../BuckarooClient.test';

describe('Multibanco methods', () => {
    test('Pay', async () => {
        await buckarooClientTest
            .method('multibanco')
            .pay({
                amountDebit: 50.3,
            })
            .request()
            .then((info) => {
                expect(info.isValidationFailure()).toBeTruthy();
            });
    });
});
