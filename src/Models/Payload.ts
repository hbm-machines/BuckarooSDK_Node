import {IServiceList} from "./ServiceList";

export declare interface Payload {
    clientIP?: ClientIP,
    currency?: string,
    returnURL?: string,
    returnURLError?: string,
    returnURLCancel?: string,
    returnURLReject?: string,
    pushURL?: string,
    pushURLFailure?: string,
    invoice: string,
    description?: string,
    originalTransactionKey?: string,
    originalTransactionReference?: string,
    websiteKey?: string,
    culture?: string,
    startRecurrent?: boolean,
    continueOnIncomplete?: string,
    servicesSelectableByClient?: string,
    servicesExcludedForClient?: string,
    customParameters?: Array<any>,
    additionalParameters?: AdditionalParameter
    services?:IServiceList
}

export declare interface ClientIP{
    address: string,
    type: number
}

export declare type AdditionalParameter = {
    [name:string]: string | number
}

export declare interface PayPayload extends Payload{
    order: string
    amountDebit: number
}

export declare interface RefundPayload extends Payload{
    order: string
    amountCredit: number
    originalTransactionKey:string
}
