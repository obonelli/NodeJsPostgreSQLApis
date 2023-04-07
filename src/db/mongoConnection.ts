import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export const connectMongoose = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.mongoDbHost as string);

    console.log('Mongoose connected successfully');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to Mongoose');
  }
};