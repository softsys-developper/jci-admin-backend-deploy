require('dotenv').config();
import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import InitRoutes from './routes/index.routes';
import { MODE_APP, env } from './config/env.config';
const fs = require('fs');

// create and setup express app
const express = require('express');
const app = express();

import { createServer } from 'http';
import { Server } from 'socket.io';
import { dbx } from './database/index.database';
import { pagination } from 'typeorm-pagination';

// Connection To Server
const httpServer = createServer(app);
app.use(function (req: Request, res: Response, next: NextFunction) {
   if (MODE_APP == 'dev') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
   }
   next();
});

const IoOptions = () => {
   if (MODE_APP == 'dev') {
      return {
         cors: { origin: '*', methods: ['GET', 'POST'] },
         path: '/api/socket.io',
      };
   } else {
      return {
         path: '/api/socket.io',
      };
   }
};

// Connection to sokect Io
export const io = new Server(httpServer, IoOptions());
io.use((socket: any, next) => {
   const username = socket.handshake.auth.username;
   if (!username) {
      return next(new Error('invalid username'));
   }
   socket.username = username;
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
   res.send('Api Likidons...');
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
   io.on('connection', (socket: any) => {});
   console.log('Server started  => http://localhost:' + env.PORT);
});
