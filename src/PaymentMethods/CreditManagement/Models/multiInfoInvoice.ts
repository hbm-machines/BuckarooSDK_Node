import { ServiceParameters } from '../../../Utils/ServiceParameters'

export interface IMultiInfoInvoice {
    invoice: string
    invoices?: { invoiceNumber: string }[]
}
export const multiInfoInvoice = (data: IMultiInfoInvoice) => {
    const services = new ServiceParameters(data)
    services.setCountable(['invoices'])
    return services.data
}
