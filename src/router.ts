import { Request, Response, Router } from 'express';
import { GroupsController } from './controllers'

const router = Router();

router
  .get('/', (req: Request, res: Response) => res.send({app: 'Financeiro901'}))
  .get('/groups', GroupsController.list)
  .get('/groups/:id', GroupsController.get)
  .post('/groups', GroupsController.create)
  // .get('/wallets', wallets.list)
  // .get('/wallets/:id', wallets.get)
  // .post('/wallets', wallets.create)
  // .get('/users', users.list)
  // .get('/users/:id', users.get)
  // .patch('/users/:id', users.patch)
  // .delete('/users/:id', users.remove)
  // .post('/users', users.create);

export default router;
