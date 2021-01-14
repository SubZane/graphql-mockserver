const typeDefs = `
  type Author {
    id: Int!
    name: String
    posts: [Post]
  }

  type Tomte {
    name: String
  }

  type Post {
    id: Int!
    title: String
    content: String
    views: Int
    author: Author
  }

  # The schema allows query posts and author:
  type Query {
    author(id: Int!): Author
    posts: [Post]
    tomte: [Tomte]
  }
`
module.exports = {
	typeDefs: typeDefs,
}
