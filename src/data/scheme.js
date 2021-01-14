const typeDefs = `
	type ProductTeam {
		id: Int!
		product_name: String
		product_description: String
		create_date: String
	}

  type Author {
    id: Int!
    name: String
    posts: [Post]
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
		ProductTeams: [ProductTeam]
  }
`
module.exports = {
	typeDefs: typeDefs,
}
