/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import HealthCheck from '@ioc:Adonis/Core/HealthCheck';
import Route from '@ioc:Adonis/Core/Route';

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})


Route.group(() => {
	Route.post('/login', 'AuthController.login');
	Route.post('/register', 'AuthController.register');
}).prefix('/auth');


Route.group(() => {
	Route.get('/', 'UsersController.index');
	Route.get('/:id', 'UsersController.show');
	Route.post('/', 'UsersController.store');
	Route.put('/:id', 'UsersController.update');
	Route.delete('/:id', 'UsersController.destroy');
}).prefix('/users').middleware('auth');


Route.group(() => {
	Route.get('/', 'TokensController.index')
}).prefix('/tokens').middleware('auth');

