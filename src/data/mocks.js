const casual = require('casual')
const faker = require('faker')
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

	DatabaseCapabilities: () => ({
		has_database_name: true,
		oracle_charset: 'AL32UTF8',
	}),

	SoftwareProfile: () => ({
		name: casual.title,
		description: casual.short_description,
		db_version: casual.integer(0, 10),
		latest_version: casual.integer(0, 10),
		db_engine: oneOf(['MS SQL', 'Postgres', 'Oracle']),
	}),

	Quota: () => ({
		vcpu_entitled: casual.integer(0, 10),
		memgb_entitled: casual.integer(8, 128),
		diskgb_entitled: casual.integer(10, 200),
		vcpu_used: casual.integer(10, 200),
		memgb_used: casual.integer(10, 200),
		diskgb_used: casual.integer(10, 200),
	}),

	UserRoles: () => ({
		product_id: 3,
		productteam_url_slug: 'demo-admin-team',
		role: 'Product admin',
	}),

	ProductTeam: () => ({
		id: casual.integer(0, 5),
		url_slug: oneOf([
			'demo-admin-team',
			faker.helpers.slugify(casual.title).toLowerCase(),
		]),
		product_name: casual.title,
		product_description: casual._short_description,
		cost_center: casual.title,
	}),

	Operation: () => ({
		uuid: casual.uuid,
		url_slug: faker.helpers.slugify(casual.title).toLowerCase(),
		entity_name: casual.title,
		entity_type: casual.word,
		status: oneOf(['P', 'N', 'R', 'C', 'E', 'D']),
	}),

	Instance: () => ({
		url_slug: faker.helpers.slugify(casual.title).toLowerCase(),
		instance_name: casual.title,
		status: oneOf(['UP', 'DOWN', 'UNKNOWN', 'CREATING', 'DELETING']),
	}),

	User: () => ({
		first_name: casual.first_name,
		last_name: casual.last_name,
		email: casual.email,
		username: casual.username,
	}),

	Role: () => ({
		id: casual.integer(0, 200),
		name: oneOf(['Developer', 'Manager', 'Admin', 'Member', 'God']),
	}),

	Environment: () => ({
		env_name: oneOf(['Test', 'Production']),
	}),

	AddUserResult: () => ({
		success: true,
	}),

	InstanceOperationResult: () => ({
		operation_id: 123,
		success: true,
	}),

	UpdateUserResult: () => ({
		success: true,
	}),

	OracleSettings: () => ({
		oracle_charset: 'AL32UTF8',
	}),

	Query: () => ({
		// By default only two mocks are generated, here we use
		// graphql-tools MockList object to vary between 1 and 7 posts
		ProductTeams: [...new Array(casual.integer(12, 20))],
		SoftwareProfiles: [...new Array(casual.integer(4, 10))],
		Operations: [...new Array(casual.integer(15, 25))],
		UsersInProductTeam: [...new Array(casual.integer(5, 15))],
		Roles: [...new Array(casual.integer(5, 15))],
		Instances: [...new Array(casual.integer(15, 25))],
		UserRoles: [...new Array(casual.integer(1, 1))],
	}),
}
module.exports = {
	mocks: mocks,
}
