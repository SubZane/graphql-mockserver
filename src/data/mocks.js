const casual = require('casual')
const { MockList } = require('@graphql-tools/mock')

function oneOf(arr) {
	const random = Math.floor(Math.random() * arr.length)
	return arr[random]
}

const mocks = {
	// Here you could customize the mocks.
	// If you leave it empty, the default is used.
	// You can read more about mocking here: http://bit.ly/2pOYqXF

	// Use functions to specific default values per type in the schema, for example
	Int: () => casual.integer(0, 200),
	String: () => 'Default Message',
	DateTime: () => casual.date('YYYY-MM-DDTHH:mm:ss.SSSZZ'),

	Quota: () => ({
		productteam_id: casual.integer(0, 200),
		vcpu_entitled: casual.integer(0, 10),
		memgb_entitled: casual.integer(8, 128),
		diskgb_entitled: casual.integer(10, 200),
	}),

	ProductTeam: () => ({
		product_name: casual.title,
		product_description: casual._short_description,
		url_slug: casual.url_slug,
		cost_center: casual.title,
	}),

	Operation: () => ({
		uuid: casual.uuid,
		url_slug: casual.url_slug,
		entity_name: casual.title,
		entity_type: casual.word,
		status: oneOf(['P', 'N', 'R', 'C', 'E', 'D']),
	}),

	Instance: () => ({
		id: casual.integer(0, 200),
		url_slug: casual.url_slug,
		instance_name: casual.title,
		status: oneOf(['UP', 'DOWN', 'UNKNOWN', 'CREATING', 'DELETING']),
	}),

	User: () => ({
		id: casual.integer(0, 200),
		first_name: casual.first_name,
		last_name: casual.last_name,
		email: casual.email,
		username: casual.username,
	}),

	Query: () => ({
		// By default only two mocks are generated, here we use
		// graphql-tools MockList object to vary between 1 and 7 posts
		// 		ProductTeams: () => new MockList([5, 10]),

		ProductTeams: () => new MockList([5, 10]),
		Operations: () => new MockList([5, 10]),
		Users: () => new MockList([5, 10]),
	}),
}
module.exports = {
	mocks: mocks,
}
