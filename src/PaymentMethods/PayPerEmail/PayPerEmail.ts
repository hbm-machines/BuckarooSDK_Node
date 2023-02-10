import PaymentMethod from "../PaymentMethod";
import Transaction from "../../Models/Transaction";
import PaymentInvitation from "./Models/PaymentInvitation";

export default class PayPerEmail extends PaymentMethod {
  protected requiredConfigFields: Array<string> = [];
  public serviceVersion = 1;
  constructor(api) {
    super(api);
    this.paymentName = "payperemail";
    this.requiredConfigFields = this.requiredConfigFields.concat(
      this.requiredFields
    );
  }
  async paymentInvitation(model?) {
    return this.api.client.post(
      new Transaction(model, this, "PaymentInvitation", new PaymentInvitation()),
      this.api.client.getTransactionUrl()
    );
  }
}
