import md5 from 'crypto-js/md5'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import buckarooClient from '../BuckarooClient'
import HttpMethods from '../Constants/HttpMethods'

export class Hmac {
    data: string | object
    url: string
    nonce: string
    time: string
    method: string
    constructor(
        method: HttpMethods | string,
        url: string = '',
        data: string | object = '',
        nonce?: string,
        time?: string
    ) {
        this.url = url
        this.data = data
        this.nonce = nonce || ''
        this.method = method
        this.time = time || ''
    }
    createHeader() {
        this.nonce = 'nonce_' + Math.floor(Math.random() * 9999999 + 1)
        this.time = String(Math.round(Date.now() / 1000))
        return this.getHeader()
    }
    getUrlFormat() {
        let urlFormatted: URL | string = new URL(this.url)
        if (this.url) {
            urlFormatted = urlFormatted.host + urlFormatted.pathname + urlFormatted.search
            urlFormatted = this.url.replace(/^[^:/.]*[:/]+/i, '')
            urlFormatted = encodeURIComponent(urlFormatted).toLowerCase() || ''
        }
        return urlFormatted
    }
    getBase64Data() {
        let base64Data = this.data
        if (this.data) {
            if (typeof base64Data === 'object') {
                base64Data = JSON.stringify(base64Data)
            }
            base64Data = Base64.stringify(md5(base64Data))
        }
        return base64Data
    }
    hashData(hashString:string) {
        return Base64.stringify(hmacSHA256(hashString, buckarooClient().getCredentials().secretKey))
    }
    getHashString() {
        return (
            buckarooClient().getCredentials().websiteKey +
            this.method +
            this.getUrlFormat() +
            this.time +
            this.nonce +
            this.getBase64Data()
        )
    }
    getHeader() {
        let hashString = this.getHashString()

        return (
            `hmac ` +
            `${buckarooClient().getCredentials().websiteKey}:${this.hashData(hashString)}:${
                this.nonce
            }:${this.time}`
        )
    }
}
