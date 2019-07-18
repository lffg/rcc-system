const Server = use('Server');

const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'Adonis/Middleware/Session',
  'Adonis/Middleware/Shield',
  'Adonis/Middleware/AuthInit',

  'App/Middleware/General/TrimRequestBody',

  'App/Middleware/View/Userdata',
  'App/Middleware/View/AccessControl',

  'App/Middleware/Shield/CheckUserRequirements',
  'App/Middleware/Shield/IpCollector',

  'App/Middleware/General/LastVisit'
];

const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth',
  guest: 'App/Middleware/Named/Guest',
  ajax: 'App/Middleware/Named/Ajax',
  todo: 'App/Middleware/Named/Todo',
  admin: 'App/Middleware/Named/Admin'
};

const serverMiddleware = ['Adonis/Middleware/Static', 'Adonis/Middleware/Cors'];

Server.registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware);
