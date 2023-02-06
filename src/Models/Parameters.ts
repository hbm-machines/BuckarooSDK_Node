export default class Parameters {
  public parameterList: {}[] = [];
  constructor(pay, data) {
    this.setUp(pay, data);
  }
  setUp(pay, data, groupType?, groupID?) {
    let param;

    for (const payKey in pay) {
      if (typeof pay[payKey] === "function") {
        let payLoadObject;
        if (data[payKey]) {
          payLoadObject = pay[payKey](data[payKey], groupType);
          this.setUp(
            payLoadObject.data,
            data[payKey],
            payLoadObject.key,
            payLoadObject.groupID
          );
        }
        continue;
      }
      if (typeof data[payKey] === "object") {
        if (typeof groupID == "number") {
          groupID++;
          this.setUp(pay[groupID - 1], data[payKey], groupType, groupID);
        } else {
          this.setUp(pay[payKey], data[payKey], groupType, groupID);
        }
        continue;
      }
      param = {
        name: this.serviceParameterKeyOf(payKey),
        value: data[payKey] || pay[payKey],
        groupType: groupType,
        groupID: groupID,
      };
      this.parameterList.push(param);
    }
  }
  serviceParameterKeyOf(propertyName) {
    return propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
  }
}
