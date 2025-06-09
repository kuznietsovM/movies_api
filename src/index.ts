import express from 'express';
import config from './config/config';
import db from './db/sqlite.db';
import { api } from './routers';
import { errorMiddleware } from './middlewares/error.middleware';

const port = config.app.port
const app = express()

app.use(express.json())
app.use('/api', api)
app.use(errorMiddleware)

app.listen(port, async() => {
  await db.authenticate();
  console.log('Connection to the DB has been established successfully.');
  
  await db.sync({force: true});
  console.log('All models were synced.');
  
  console.log(`App started on port: ${port}`);
})