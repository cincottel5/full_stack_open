const { GraphQLError } = require('graphql')

const graphError = (description, invalidArgs, error,  code = 'BAD_USER_INPUT') => {
  throw new GraphQLError(description, {
    extensions: {
      code: code,
      invalidArgs: invalidArgs,
      error
    }
  })
}

module.exports = { graphError }