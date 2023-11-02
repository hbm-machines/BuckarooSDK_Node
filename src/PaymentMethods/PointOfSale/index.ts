import { PayablePaymentMethod } from '../../Services';
import { IPay, Pay } from './Models/Pay';

export default class PointOfSale<
    Code extends 'pospayment',
    Manually extends boolean = false
> extends PayablePaymentMethod<Code, Manually> {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }
}
