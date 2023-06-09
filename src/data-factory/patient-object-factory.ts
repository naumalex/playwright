import { getAge } from "../utils/patient";

export type Patient = {
    lastName: string;
    firstName: string;
    fullName: string;
    dob: string;
    gender: string;
    age: string;
  }

  export class PatientBuilder {
    private readonly _patient: Patient;
  
    constructor() {
      this._patient = {
        lastName: '',
        firstName: '',
        fullName: '',
        dob: '',
        gender: '',
        age: ''
      };
    }
  
    firstName(name: string): PatientBuilder {
      this._patient.firstName = name;
      return this;
    }
    
    lastName(name: string): PatientBuilder {
        this._patient.lastName = name;
        return this;
    }

    fullName(name: string): PatientBuilder {
        this._patient.fullName = name;
        this._patient.firstName = name.split(' ', 2)[1];
        this._patient.lastName = name.split(' ', 2)[0];
        return this;
    }
    
    dob(dob: string) {
        this._patient.dob = dob;
        return this;
    }
    
    gender(gender: string) {
        this._patient.gender = gender;
        return this;
    }

    age(age: string) {
        this._patient.age = age;
        return this;
    }

    calculateFullName() {
        this._patient.fullName = this._patient.lastName + ' ' + this._patient.firstName;
        return this;
    }

    calculateAge() {
        if (this._patient.dob) {
           this._patient.age = getAge(this._patient.dob);
        }
        return this;
    }
    build(): Patient {
      console.log(this._patient);
        return this._patient;
    }
  }


export const patientData = [(new PatientBuilder)
    .fullName('Gump Forrest Alexander').age(getAge('1961-11-7'))
    .gender('M')
    .build(),
    (new PatientBuilder).fullName('Asbury Wallace G')
    .age(getAge('1910-01-20'))
    .gender('M')
    .build()
]
/*{
    lastName: 'Gump',
    firstName: 'Forrest Alexander',
    fullName: (function () { return this.lastName + this.firstName })(),
    dob: '1961-11-7',
    age: (function () { return getAge(this.dob) })(),
    gender: 'M'
}*/


