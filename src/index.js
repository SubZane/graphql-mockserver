const cors = require('cors')
const { addMocksToSchema } = require('@graphql-tools/mock')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')

const { graphqlHTTP } = require('express-graphql')
const { typeDefs } = require('./data/scheme')
const { mocks } = require('./data/mocks')

const schema = makeExecutableSchema({ typeDefs, mocks })
const schemawithmocks = addMocksToSchema({ schema, mocks })

const app = express()

var allowedOrigins = ['http://localhost:3000', 'http://localhost:4000']

app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) return callback(null, true)
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					'The CORS policy for this site does not ' +
					'allow access from the specified Origin.'
				return callback(new Error(msg), false)
			}
			return callback(null, true)
		},
	}),
	graphqlHTTP({
		schema: schemawithmocks,
		graphiql: true,
	})
)

/**
 query posts {
  posts {
    title
    views
  }
}
query author {
  author(id: 1) {
    name
    posts {
      title
      content
      views
    }
  }
}

query tomte {
  tomte {
    name
  }
}
 *
 */

app.listen(4000, () => {
	console.info('Listening on http://localhost:4000')
})
