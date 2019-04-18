const { HttpException } = use('@adonisjs/generic-exceptions')
const Route = use('Route')

// Páginas de início:
Route.any('index.html', 'Main/DashboardController.index')
Route.any('/', 'Main/DashboardController.index').as('index')

require('./_api')
require('./_main')
require('./_admin')
require('./_main.auth')
require('./_main.users')
require('./_main.session')
require('./_main.requests')

Route.any('/post', async ({ request, auth }) => {
  if (
    process.env.NODE_ENV === 'development' ||
    (await auth.user.hasPermission('DEV', true))
  ) {
    return request.all()
  }

  throw new HttpException('Erro.', 403)
})
