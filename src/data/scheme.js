const typeDefs = `
scalar DateTime

	type ComputeSize {
		size: String!
	}

	type Monitored {
		monitored: Boolean!
	}

	type UserCapabilities {
		can_add_user: Boolean!
		can_edit_user: Boolean!
		can_remove_user: Boolean!
		can_clone_instance: Boolean!
		can_create_instance: Boolean!
		can_delete_instance: Boolean!
	}

	type DatabaseCapabilities {
		has_database_name: Boolean!
		has_database_password: Boolean!
		characterset: String!
		monitored: [Monitored!]!
		environment: [Environment!]!
		softwareprofile: [SoftwareProfile!]!
		compute_size: [ComputeSize!]!

		is_cluster: [IsClustered]
		nodes: [ClusterNodes]
		ora_custom: [OracleCustom]
		oracle_nls_length_sematic: [OracleNLSLengthSematic]
		oracle_charsets: [OracleCharsets]
		oracle_blocksize: [OracleBlocksize]
		oracle_charset: String
		ora_cdb: [OraCDB]
		ora_java: [OraJava]
	}

	type ScanDetails {
		scanname: String
		scanip: String
	}

	type OracleCustom {
		ora_custom: Boolean!
	}

	type IsClustered {
		is_cluster: Boolean!
	}

	type ClusterNodes {
		nodes: Int!
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
		publicip: String!
		virtualip: String!
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
		productteam_url_slug: String!
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

  type InstanceOperationResult {
    success: Boolean!
		operation_id: Int!
  }

	type Mutation {
		addUserToProductTeam(productteam_url_slug: String!, email: String!, role_id: Int!) :AddUserResult!
		updateUser(productteam_url_slug: String!, user_id: Int!, role_id: Int!):UpdateUserResult!
		removeUserFromProductTeam(productteam_url_slug: String!, user_id: Int!, comment: String):RemoveUserResult!

		createInstance(productteam_url_slug: String!, db_engine: Int!,	db_profile: Int!,	db_size: String!, db_env: Int!, database: String!, password: String!, monitored: Boolean!, backup_sla: Int!,	characterset: String!, ora_java: Boolean!, ora_custom: Boolean!,	ora_n_charset: String!,	ora_cdb_only: Boolean!,	ora_blocksize: Int!, ora_nls_length_sem: String!, is_cluster: Boolean!, nodes: Int!): InstanceOperationResult!
		cloneInstance(instance_url_slug: String!, pit: String!, db_env: Int!):InstanceOperationResult!
		removeInstance(instance_url_slug: String!, comment: String): InstanceOperationResult!

		startInstance(instance_url_slug: String!): InstanceOperationResult!
		stopInstance(instance_url_slug: String!): InstanceOperationResult!
		restartInstance(instance_url_slug: String!): InstanceOperationResult!
	}

  # The schema allows query posts and author:
  type Query {
		Instance(url_slug: String!): Instance!
		Instances(productteam_url_slug: String!): [Instance!]!
		Credentials(instance_url_slug: String!): Credentials!
		Databases(instance_url_slug: String!): [Database!]!
		Hosts(instance_url_slug: String!): [Host!]!
		ScanDetails(instance_url_slug: String!): ScanDetails

		Operation(url_slug: String!): Operation!
		Operations(productteam_url_slug: String): [Operation!]!

		ProductTeam(url_slug: String!): ProductTeam!
		ProductTeams: [ProductTeam!]!
		Quota(productteam_url_slug: String!): Quota

		User(id: Int!, productteam_url_slug: String!): User!
		UserInProductTeam(id: Int!, productteam_url_slug: String!): UserInProductTeam!
		UsersInProductTeam(productteam_url_slug: String!): [UserInProductTeam!]!
		Roles: [Role!]!

		Environments: [Environment!]!

		DatabaseEngines: [DatabaseEngine!]!
		SoftwareProfiles(db_engine_id: Int!): [SoftwareProfile!]!
		ComputeSizes(db_engine_id: Int!): [ComputeSize!]!
		DatabaseCapabilities(db_engine_id: Int!): DatabaseCapabilities!

		UserRoles: [UserRoles!]!
		OraJava: [OraJava!]!
		OraCDB: [OraCDB!]!
		OracleBlocksize: [OracleBlocksize!]!
		OracleCharsets: [OracleCharsets!]!
		OracleNLSLengthSematic: [OracleNLSLengthSematic!]!

		IsClustered: [IsClustered!]!
		ClusterNodes: [ClusterNodes]
		UserCapabilities(user_id: Int!, productteam_url_slug: String!): UserCapabilities!
		OracleCustom: [OracleCustom]
  }
`
module.exports = {
	typeDefs: typeDefs,
}
