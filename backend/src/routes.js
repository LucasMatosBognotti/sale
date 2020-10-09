import { Router } from 'express';

import SaleController from './app/controllers/SaleController';

const routes = new Router();

routes.post('/sale', SaleController.store);
routes.get('/sales', SaleController.index);
routes.get('/sale/:id', SaleController.show);
routes.put('/sale/:id', SaleController.update);
routes.delete('/sale/:id', SaleController.delete);

export default routes;
