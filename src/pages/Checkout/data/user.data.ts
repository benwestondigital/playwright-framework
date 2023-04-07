import * as dotenv from 'dotenv';

dotenv.config();

// Login Details
export type LoginDetails = {
  email: string;
  password: string;
};

export const userDetails: LoginDetails = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};