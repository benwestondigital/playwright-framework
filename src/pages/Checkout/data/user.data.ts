import * as dotenv from 'dotenv';

dotenv.config();

// Login Details
export type LoginDetails = {
  username: string;
  password: string;
};

export const userDetails: LoginDetails = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};