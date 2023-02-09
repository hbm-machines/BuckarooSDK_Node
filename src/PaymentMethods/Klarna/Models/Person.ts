
export default class Person {
    category: string = '';
    gender?: string;
    culture?: string;
    careOf?: string;
    title?: string;
    initials?: string;
    name?: string;
    firstName: string = '';
    lastNamePrefix?: string;
    lastName: string = '';
    birthDate?: string;
    placeOfBirth?: string;

    constructor(data) {
        this.category = data.category;
        this.gender = data.gender;
        this.culture = data.culture;
        this.careOf = data.careOf;
        this.title = data.title;
        this.initials = data.initials;
        this.name = data.name;
        this.firstName = data.firstName;
        this.lastNamePrefix = data.lastNamePrefix;
        this.lastName = data.lastName;
        this.birthDate = data.birthDate;
        this.placeOfBirth = data.placeOfBirth;
    }
}
