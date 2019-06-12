function usernameFilter(builder, queryTerm) {
  if (!queryTerm) {
    return builder;
  }

  return builder.where('username', 'like', `%${queryTerm}%`);
}

exports.username = usernameFilter;
