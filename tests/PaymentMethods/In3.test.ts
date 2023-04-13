import RecipientCategory from "../../src/Constants/RecipientCategory";
import In3 from '../../src/PaymentMethods/In3'
import {TransactionResponse} from "../../src/Models/TransactionResponse";

require('../BuckarooClient.test')

const in3 = new In3()

describe('Testing In3 methods', () => {
    test('PayInInstallments', async () => {

      // @ts-ignore
        const a = new TransactionResponse({})
        a.getServiceParameters()
    })
    test('Pay', async () => {
        await in3
            .payInInstallments({
                clientIP: '127.0.0.0',
                description: "fdsfsdfdsf",
                subtotalLine: [],
                amountDebit:32,
                customerType: "Company",
                invoiceDate: "22-01-2018",
                person: {
                    gender: "2",
                    culture: "nl-NL",
                    initials: "J.S.",
                    lastName: "Aflever",
                    birthDate: "1990-01-01"
                },
                company: {
                    name: "My Company B.V.",
                    chamberOfCommerce: "123456"
                },
                address: {
                    street: "Hoofdstraat",
                    houseNumber: 2,
                    houseNumberSuffix: "a",
                    zipCode: "8441EE",
                    city: "Heerenveen",
                    country: "NL"
                },
                email: {
                    email: "test@buckaroo.nl"
                },
                phone: {
                    phone: "0612345678"
                },
                productLine: [{
                    code: "64381664f2f8b",
                    price: 10,
                    quantity: 1,
                    name: "Blue Toy Car"
                }],
                name: "Verzendkosten",
                value: 1
            })
            .then((response) => {
                expect(response.data).toBeDefined()
            })
    })
})
