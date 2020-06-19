import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProfileController from './app/controllers/ProfileController';
import MailController from './app/controllers/MailController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/profiles', ProfileController.index);
routes.post('/profiles', ProfileController.store);
routes.put('/profiles/:id', ProfileController.update);

routes.post('/sendMail', upload.array('attachments'), MailController.store);

export default routes;
