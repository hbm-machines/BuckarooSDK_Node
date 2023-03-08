import { TransactionRequest } from '../Models/Request'
import { IConfig } from '../Utils/Types'
import { buckarooClient } from '../BuckarooClient'
import {ServiceParameterList} from "../Utils/ServiceParameter";
import Model from "../Models/Model";
import {Combinable} from "../Utils/Combinable";
export default abstract class PaymentMethod {
    protected readonly requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    protected _paymentName = ''
    protected _serviceVersion = 0
    protected request: TransactionRequest = new TransactionRequest()
    private _action = ''

    protected services: (data) => ServiceParameterList = (data) => {
        return new ServiceParameterList(data)
    }
    get paymentName(): string {
        return this._paymentName
    }

    get serviceVersion(): number {
        return this._serviceVersion
    }
    get action(): string {
        return this._action
    }
    set action(value: string) {
        this._action = value
    }
    protected setServiceList(serviceList: ServiceParameterList) {
        this.request.addServices({
            name: this.paymentName,
            action: this.action,
            version: this.serviceVersion,
            parameters: serviceList.formatServiceParameters()
        })
    }
    protected setAdditionalParameters(additionalParameters?: AdditionalParameters) {
        if (additionalParameters) {
            this.request.setDataKey('additionalParameters', {
                additionalParameter: Object.keys(additionalParameters).map((key) => {
                    return {
                        name: key,
                        value: additionalParameters[key] ?? ''
                    }
                })
            })
        }
    }

    protected setRequiredFields() {
        for (const requiredField of this.requiredFields) {
            if (!this.request.getData()[requiredField])
                this.request.setDataKey(requiredField, buckarooClient().getConfig()[requiredField])
        }
    }
    protected transactionRequest() {
        return buckarooClient().client().post(this.request.getData(), buckarooClient().client().getTransactionUrl())
    }
    public combine(method: Combinable){
        const data = method['request'].getData().services
        if(data?.ServiceList){
            for (const serviceList of data.ServiceList) {
                if (!this.request.getData().services?.ServiceList.includes(serviceList)){
                    this.request.addServices(serviceList)
                }
            }
        }
        return this
    }
    protected dataRequest() {
        return buckarooClient().client().dataRequest(this.request.getData())
    }
    protected setRequest(data) {

        const model = new Model(data)

        //Get Services
        const services = this.services(model.filter(this.request.requestParams()))

        //Set the Payload
        this.request.setData(model.only(this.request.requestParams()))

        //Set required Fields
        this.setRequiredFields()

        //Set Services
        this.setServiceList(services)

        //Set setAdditionalParameters
        this.setAdditionalParameters(data.additionalParameters)
    }
    public specifications() {
        return buckarooClient().client().specification(this.paymentName, this.serviceVersion)
    }
}
export declare interface AdditionalParameters {
    additionalParameters?: Array<any>
}
