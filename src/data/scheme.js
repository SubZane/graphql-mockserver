const typeDefs = `
scalar DateTime

type ComputeSize {
	size: Int!
}

	type OracleSettings {
		oracle_nls_length_sematic: [OracleNLSLengthSematic!]!
		oracle_charsets: [OracleCharsets!]!
		oracle_blocksize: [OracleBlocksize!]!
	}

	type OracleNLSLengthSematic {
		nls_length_sematic: String!
	}

	type OracleBlocksize {
		blocksize: String!
	}

	type OracleCharsets {
		charset: String!
	}

	type Quota {
		productteam_id: Int!
    vcpu_entitled: Int
    memgb_entitled: Int
    diskgb_entitled: Int
    vcpu_used: Int
    memgb_used: Int
		diskgb_used: Int
	}

	type Instance {
		id: Int!
		url_slug: String
		instance_name: String!
		status: String!
		is_clone: Boolean!
		product_team: ProductTeam!
		environment: Environment!
		softwareprofile: SoftwareProfile!
		credentials: Credentials!
		databases: [Database!]!
		hosts: [Host!]!
	}

	type Database {
		name: String!
	}

	type DatabaseEngine {
		id: Int!
		display_name: String!
		engine: String!
	}

	type Host {
		id: String!
		hostname: String!
		ipv4: String!
		role: String!
		vcpu: String!
		memgb: String!
		diskgb: String!
	}

	type Credentials {
		instance: String!
		username: String!
		db_port: Int!
		db_host: String!
		conn_string: String!
	}

	type Environment {
		id: Int!
		env_name: String!
	}

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
		properties: [SoftwareProfileProperties!]!
	}

	type SoftwareProfileProperties {
		name: String!
		value: String!
		secure: Boolean!
	}

	type Compute {
		id: Int!
		uuid: String!
		name: String!
		description: String!
		type: String!
		latestVersion: String!
		properties: [ComputeProperties]!
	}

	type ComputeProperties {
		name: String!
		value: String!
		secure: Boolean!
	}

	type ProductTeam {
		id: Int!
		url_slug: String
		product_name: String!
		product_description: String!
		create_date: DateTime
		cost_center: String
		owner: User!
		organisation: Organisation
		contact: Contact
	}

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

	type Contact {
		phone: String
		web: String
		email: String
	}

	type Organisation {
		name: String
		display_name: String
	}

	type User {
		id: Int!
		first_name: String!
		last_name: String!
		email: String!
		username: String!
		product_teams: [UserProductTeams!]!
	}

	type UserProductTeams {
		product_team: ProductTeam!
		productteam_relation_id: Int!
		role: Role!
	}

	type Role {
		id: Int!
		name: String!
	}

  type AddUserResult {
    success: Boolean!
  	productteam_relation_id: Int!
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
		removeInstance(id: Int!): DeleteInstanceResult!
		addUserToProductTeam(productteam_id: Int!, user_id: Int!,role_id: Int!) :AddUserResult!
		updateUser(productteam_relation_id: Int!, productteam_id: Int!, user_id: Int!,role_id: Int!):UpdateUserResult!
		removeUserFromProductTeam(productteam_id: Int!, user_id: Int!):RemoveUserResult!
		createInstance(productteam_id: Int!, db_engine: String!,	db_profile: Int!,	db_size: String!, db_env: Int!, database: String!, password: String!, monitored: Boolean!, backup_sla: Int!,	characterset: String!, ora_java: Boolean!, ora_custom: Boolean!,	ora_n_charset: String!,	ora_cdb_only: Boolean!,	ora_blocksize: Int!, ora_nls_length_sem: String!):CreateInstanceResult!
		cloneInstance(instance_id: Int!, pit: String!, db_env: Int!):CloneInstanceResult!
	}

  # The schema allows query posts and author:
  type Query {
		OracleSettings: OracleSettings!
		Instances(productteam_id: Int!): [Instance!]!
		Operations(productteam_id: Int): [Operation!]!
		ProductTeams: [ProductTeam!]!
		Quota(productteam_id: Int!): Quota
		User(productteam_id: Int, id: Int, productteam_relation_id: Int): User!
		Users(productteam_id: Int, exclude_productteam_id: Int): [User!]!
		Roles: [Role!]!
		Instance(id: Int!): Instance!
		Operation(id: Int!): Operation!
		ProductTeam(id: Int!): ProductTeam!
		Environments: [Environment!]!
		SoftwareProfiles: [SoftwareProfile!]!
		Computes: [Compute!]!
		DatabaseEngines: [DatabaseEngine!]!
		ComputeSizes: [ComputeSize!]!
  }
`
module.exports = {
	typeDefs: typeDefs,
}
