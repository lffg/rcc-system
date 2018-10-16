'use strict'

const Server = use('Server')

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
|
| Global middleware are executed on each http request only when the routes
| match.
|
*/
const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'Adonis/Middleware/Session',
  'Adonis/Middleware/Shield',
  'Adonis/Middleware/AuthInit',

  'App/Middleware/View/Userdata',
  'App/Middleware/View/Group',

  'App/Middleware/Shield/CheckUserRequirements',
  'App/Middleware/Shield/IpCollector',

  'App/Middleware/General/LastVisit'
]

/*
|--------------------------------------------------------------------------
| Named Middleware
|--------------------------------------------------------------------------
|
| Named middleware is key/value object to conditionally add middleware on
| specific routes or group of routes.
|
*/
const namedMiddleware = {
  'auth'  : 'Adonis/Middleware/Auth',
  'guest' : 'App/Middleware/Named/Guest',
  'ajax'  : 'App/Middleware/Named/Ajax',
  'admin' : 'App/Middleware/Named/Admin'
}

/*
|--------------------------------------------------------------------------
| Server Middleware
|--------------------------------------------------------------------------
|
| Server level middleware are executed even when route for a given URL is
| not registered. Features like `static assets` and `cors` needs better
| control over request lifecycle.
|
*/
const serverMiddleware = [
  'Adonis/Middleware/Static',
  'Adonis/Middleware/Cors'
]

Server
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware)
