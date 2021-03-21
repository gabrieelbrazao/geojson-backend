import Route from '@ioc:Adonis/Core/Route'

Route.get('/users/login', 'UsersController.login')

Route.post('/users', 'UsersController.store')

Route.get('/geoms/:userId', 'GeomsController.show')

Route.post('/geoms', 'GeomsController.store')
