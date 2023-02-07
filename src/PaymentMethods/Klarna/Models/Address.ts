import AddressModel from "../../../Models/Address";
import Model from "../../../Models/Model";
// import { AddressParams } from "../../../Models/Address";
export default class Address extends Model implements AddressModel {
  street?: string;
  houseNumber?: string;
  houseNumberAdditional?: string;
  zipcode?: string;
  city?: string;
  country?: string;

  constructor(data) {
    super()
    this.street = data.street;
    this.houseNumber = data.houseNumber;
    this.houseNumberAdditional = data.houseNumberAdditional;
    this.zipcode = data.zipcode;
    this.city = data.city;
    this.country = data.country;

    this.setKeys({
      houseNumber: "StreetNumber",
      houseNumberAdditional: "StreetNumberAdditional",
      zipcode: "PostalCode",
    });
  }
}
