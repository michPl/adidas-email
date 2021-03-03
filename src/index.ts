import dotenv from 'dotenv';
dotenv.config();

process.on('unhandledRejection', (...error) => console.error('Unhandled Rejection', {error}));

import {Worker} from 'bullmq';
import {Mailer} from './services/Mailer';

const mailer = new Mailer();
new Worker(process.env.DISPATCH_QUEUE_NAME,
  async ({name, data}) => {
    if (name === process.env.DISPATCH_JOB_NAME) {
      const {emails, message} = data as {emails: string[], message: {title: string, message: string}};
      await mailer.send(emails, message);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      db: Number(process.env.REDIS_DB),
    }
  }
);

