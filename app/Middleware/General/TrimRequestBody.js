class TrimRequestBody {
  async handle({ request }, next) {
    if (Object.keys(request.body).length) {
      request.body = Object.assign(
        ...Object.keys(request.body).map((key) => ({
          [key]:
            request.body[key] !== ''
              ? typeof request.body[key] === 'string'
                ? request.body[key].trim()
                : request.body[key]
              : null
        }))
      )
    }

    return next()
  }
}

module.exports = TrimRequestBody
