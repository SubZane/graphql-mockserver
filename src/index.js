const { addMocksToSchema } = require('@graphql-tools/mock')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')

const { graphqlHTTP } = require('express-graphql')
const { typeDefs } = require('./data/scheme')
const { mocks } = require('./data/mocks')

const schema = makeExecutableSchema({ typeDefs, mocks })
const schemawithmocks = addMocksToSchema({ schema, mocks })

const app = express()
app.use(
	graphqlHTTP({
		schema: schemawithmocks,
		graphiql: true,
	})
)

app.listen(4000, () => {
	console.info('Listening on http://localhost:4000')
})