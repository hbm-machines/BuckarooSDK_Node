import { initializeBuckarooClient} from "../BuckarooClient";
import client from "../Request/Client";
initializeBuckarooClient()
test('PaymentStatus', async () => {
    await client.getPaymentStatus('0B1E824B780248A88546E6A8D092E17A')
            .then((data) => {
                expect(data).toBeDefined()
            })
})
test('paymentCancelStatus', async () => {
    await client.getPaymentCancelStatus('73902D944DC848CBADC49D9B8A8C2F16')
        .then((data) => {
            expect(data).toBeDefined()
        })
})

test('paymentRefundInfo', async () => {
    await client.getPaymentRefundInfo('73902D944DC848CBADC49D9B8A8C2F16')
        .then((data) => {
            expect(data).toBeDefined()
        })
})

test('paymentInvoiceInfo', async () => {
    await client.getPaymentInvoiceInfo('5f5701d44aac88')
        .then((data) => {
            expect(data).toBeDefined()
        })
})

