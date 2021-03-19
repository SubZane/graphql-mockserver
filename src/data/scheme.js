const typeDefs = `
scalar DateTime

	type ComputeSize {
		size: Int!
	}

	type DatabaseCapabilities {
		database_name: Boolean!
		database_password: Boolean!
		postgres_settings: PostgresSettings
		oracle_settings: OracleSettings
		sqlserver_settings: SQLServerSettings
	}

	type OracleSettings {
		oracle_nls_length_sematic: [OracleNLSLengthSematic!]!
		oracle_charsets: [OracleCharsets!]!
		oracle_blocksize: [OracleBlocksize!]!
		oracle_charset: String!
		ora_cdb: [OraCDB!]!
		ora_java: [OraJava!]!
	}

	type PostgresSettings {
		hasValues: Boolean!
	}

	type SQLServerSettings {
		hasValues: Boolean!
	}

	type OracleNLSLengthSematic {
		nls_length_sematic: String!
	}

	type OraJava {
		ora_java: Boolean!
	}

	type OraCDB {
		ora_cdb: Boolean!
	}

	type OracleBlocksize {
		blocksize: String!
	}

	type OracleCharsets {
		charset: String!
	}

	# DONE
	type Quota {
		product_team: ProductTeam!
    vcpu_entitled: Int
    memgb_entitled: Int
    diskgb_entitled: Int
    vcpu_used: Int
    memgb_used: Int
		diskgb_used: Int
	}

	# DONE
	type Instance {
		id: Int!
		url_slug: String!
		instance_name: String!
		status: String!
		is_clone: Boolean!
		is_cluster: Boolean!
		source_db: Instance
		product_team: ProductTeam!
		environment: Environment!
		softwareprofile: SoftwareProfile!
	}

	# DONE
	type Database {
		instance: Instance!
		name: String!
	}

	type DatabaseEngine {
		id: Int!
		display_name: String!
		engine: String!
	}

	# DONE
	type Host {
		instance: Instance!
		id: String!
		hostname: String!
		ipv4: String!
		role: String!
		vcpu: String!
		memgb: String!
		diskgb: String!
	}

	# DONE
	type Credentials {
		instance: Instance!
		username: String!
		db_port: Int!
		db_host: String!
		conn_string: String!
	}

	# DONE
	type Environment {
		id: Int!
		env_name: String!
	}

	# Ska kompletteras från backend
	type SoftwareProfile {
		id: Int!
		uuid: String!
		name: String!
		description: String!
		status: String!
		engine_type: String!
		type: String!
		latest_version: String!
		latest_versionId: String!
		db_version: String!
		db_engine: String!
	}

	# DONE
	type ProductTeam {
		id: Int!
		url_slug: String!
		product_name: String!
		product_description: String!
		create_date: DateTime!
		cost_center: String
		owner: User!
		organisation: Organisation!
	}

	# Ska göras om
	type Operation {
		uuid: String!
		id: Int!
		url_slug: String!
		create_date: DateTime
		start_date: DateTime
		end_date: DateTime
		creator: User!
		product_team: ProductTeam!
		entity_name: String!
		entity_type: String!
		status: String!
		log: String!
	}

	type Organisation {
		name: String!
		display_name: String!
	}

	# DONE
	# ta bort product_teams
	type User {
		id: Int!
		first_name: String
		last_name: String
		email: String
		username: String!
	}

	type UserInProductTeam {
		user: User!
		role_name: String!
		role_id: Int!
	}

	type UserRoles {
		product_id: Int!
		role: String!
	}

	# DONE
	type Role {
		id: Int!
		name: String!
	}

  type AddUserResult {
    success: Boolean!
  	user_id: Int!
  }

  type UpdateUserResult {
    success: Boolean!
  }

  type RemoveUserResult {
    success: Boolean!
  }

  type CreateInstanceResult {
    success: Boolean!
		operation_id: Int!
  }

  type CloneInstanceResult {
    success: Boolean!
		operation_id: Int!
  }

	type DeleteInstanceResult {
    success: Boolean!
		operation_id: Int!
  }

	type Mutation {
		addUserToProductTeam(productteam_id: Int!, email: String!, role_id: Int!) :AddUserResult!
		updateUser(productteam_id: Int!, user_id: Int!, role_id: Int!):UpdateUserResult!
		removeUserFromProductTeam(productteam_id: Int!, user_id: Int!):RemoveUserResult!

		createInstance(productteam_id: Int!, db_engine: String!,	db_profile: Int!,	db_size: String!, db_env: Int!, database: String!, password: String!, monitored: Boolean!, backup_sla: Int!,	characterset: String!, ora_java: Boolean!, ora_custom: Boolean!,	ora_n_charset: String!,	ora_cdb_only: Boolean!,	ora_blocksize: Int!, ora_nls_length_sem: String!): CreateInstanceResult!
		cloneInstance(instance_id: Int!, pit: String!, db_env: Int!):CloneInstanceResult!
		removeInstance(id: Int!): DeleteInstanceResult!
	}

  # The schema allows query posts and author:
  type Query {
		Instance(id: Int!): Instance!
		Instances(productteam_id: Int!): [Instance!]!
		Credentials(instance_id: Int!): Credentials!
		Databases(instance_id: Int!): [Database!]!
		Hosts(instance_id: Int!): [Host!]!

		Operation(id: Int!): Operation!
		Operations(productteam_id: Int): [Operation!]!

		ProductTeam(id: Int!): ProductTeam!
		ProductTeams: [ProductTeam!]!
		Quota(productteam_id: Int!): Quota

		User(id: Int!, productteam_id: Int!): User!
		UserInProductTeam(id: Int!, productteam_id: Int!): UserInProductTeam!
		UsersInProductTeam(productteam_id: Int!): [UserInProductTeam!]!
		Roles: [Role!]!

		Environments: [Environment!]!

		DatabaseEngines: [DatabaseEngine!]!
		SoftwareProfiles(db_engine_id: Int!): [SoftwareProfile!]!
		ComputeSizes(db_engine_id: Int!): [ComputeSize!]!
		DatabaseCapabilities(db_engine_id: Int!): DatabaseCapabilities!

		UserRoles: [UserRoles!]!
		OraJava: [OraJava!]!
		OraCDB: [OraCDB!]!
  }
`
module.exports = {
	typeDefs: typeDefs,
}
