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

	SoftwareProfile: () => ({
		name: casual.title,
		description: casual.short_description,
		db_version: casual.integer(0, 10),
		latest_version: casual.integer(0, 10),
		db_engine: oneOf(['MS SQL', 'Postgres', 'Oracle']),
	}),

	Quota: () => ({
		productteam_id: casual.integer(0, 200),
		vcpu_entitled: casual.integer(0, 10),
		memgb_entitled: casual.integer(8, 128),
		diskgb_entitled: casual.integer(10, 200),
		vcpu_used: casual.integer(10, 200),
		memgb_used: casual.integer(10, 200),
		diskgb_used: casual.integer(10, 200),
	}),

	UserRoles: () => ({
		product_id: 3,
		role: 'Product admin',
	}),

	ProductTeam: () => ({
		id: casual.integer(0, 5),
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
		url_slug: casual.url_slug,
		instance_name: casual.title,
		status: oneOf(['UP', 'DOWN', 'UNKNOWN', 'CREATING', 'DELETING']),
	}),

	Environment: () => ({
		env_name: oneOf(['Test', 'Production']),
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

	AddUserResult: () => ({
		success: true,
	}),

	CreateInstanceResult: () => ({
		operation_id: 123,
		success: true,
	}),

	CloneInstanceResult: () => ({
		operation_id: 123,
		success: true,
	}),

	UpdateUserResult: () => ({
		success: true,
	}),

	ComputeSizes: () => ({
		size: oneOf(['XSmall', 'Small', 'Medium', 'Large']),
	}),

	OracleBlocksize: () => ({
		blocksize: oneOf(['8', '16', '32']),
	}),

	OracleCharsets: () => ({
		charset: oneOf(['UTF8', 'AL16UTF16']),
	}),

	OracleNLSLengthSematic: () => ({
		nls_length_sematic: oneOf(['CHAR', 'BYTE']),
	}),

	OracleSettings: () => ({
		oracle_nls_length_sematic: () => new MockList([2, 2]),
		oracle_charsets: [...new Array(casual.integer(2, 2))],
		oracle_blocksize: [...new Array(casual.integer(3, 3))],
		oracle_charset: 'AL32UTF8',
	}),

	DatabaseEngine: () => ({
		display_name: oneOf(['Postgres', 'Oracle', 'MS SQL Server']),
		engine: oneOf([
			'postgres_database',
			'oracle_database',
			'sqlserver_database',
		]),
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
		DatabaseEngines: [...new Array(casual.integer(3, 3))],
		ComputeSizes: [...new Array(casual.integer(4, 4))],
		UserRoles: [...new Array(casual.integer(1, 1))],
	}),
}
module.exports = {
	mocks: mocks,
}
