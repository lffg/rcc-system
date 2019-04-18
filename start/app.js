const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/lucid-slugify/providers/SlugifyProvider'
]

const aceProviders = ['@adonisjs/lucid/providers/MigrationsProvider']

const aliases = {
  Log: 'App/Services/General/Log'
}

const commands = []

module.exports = { providers, aceProviders, aliases, commands }
