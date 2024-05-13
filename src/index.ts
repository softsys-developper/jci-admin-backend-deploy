import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import InitRoutes from './routes/index.routes';
import { MODE_APP, env } from './config/env.config';
import dotenv from 'dotenv';
dotenv.config();

// create and setup express app
import express from 'express';
const app = express();

import { createServer } from 'http';
import { dbx } from './database/index.database';

// Connection To Server
const httpServer = createServer(app);
app.use(function (req: Request, res: Response, next: NextFunction) {
   if (MODE_APP == 'dev') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
   }
   next();
});

// Middlewares And Redirect Route
app.use(express.json());
app.use('/i-images', express.static('public'));
app.use('/i-providers', express.static('public/providers'));
app.use('/', express.static('templates'));

// Config Engine
app.set('view engine', 'ejs');

// Routes
InitRoutes(app);
app.get('', async (req: Request, res: Response) => {
   res.send('Api Jci...');
});

// Database Connected
dbx.initialize()
   .then(() => {
      console.log('Data Source has been initialized!');
   })
   .catch((err) => {
      console.error('Error during Data Source initialization', err);
   });

// STARTING OF SERVER APP
httpServer.listen(env.PORT, () => {
   console.log('Server started  => http://localhost:' + env.PORT);
});
