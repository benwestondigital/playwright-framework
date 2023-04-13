import { faker } from '@faker-js/faker';
import { writeFile } from 'fs';

export function generateRandomUser(): User {
  faker.locale = 'en_GB';
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    email: `${faker.internet.email()}`,
    password: 'j0hnl3w1s!',
    firstName: firstName,
    lastName: lastName,
    phoneNumber: faker.phone.number('07#########'),
    dateOfBirth: {
      day: faker.datatype.number({ min: 1, max: 31 }).toString(),
      month: faker.datatype.number({ min: 1, max: 12 }).toString(),
      year: faker.datatype.number({ min: 1920, max: 2004 }).toString(),
    },
    address: {
      line1: `${faker.address.buildingNumber()} ${faker.address.street()}`,
      line2: faker.address.secondaryAddress(),
      city: faker.address.cityName(),
      county: faker.address.county(),
      postcode: faker.address.zipCode(),
      country: 'United Kingdom',
    },
  };
}

function saveUser(user: User) {
  writeFile('src/state/savedUser.json', JSON.stringify(user), (err) => {
    if (err) {
      throw err;
    }
    console.log('The user has been saved to file.');
  });
}

export type User = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: {
    day: string;
    month: string;
    year: string;
  };
  address?: {
    line1: string;
    line2?: string;
    city: string;
    county?: string;
    postcode: string;
    country: string;
  };
};
