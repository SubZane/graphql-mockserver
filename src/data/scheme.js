const typeDefs = `
scalar DateTime

	type Quota {
		productteam_id: Int!
    vcpu_entitled: Int
    memgb_entitled: Int
    diskgb_entitled: Int
    vcpu_used: Int
    memgb_used: Int
		diskgb_used: Int
	}

	type DBEng {
		name: String
    display_name: String
	}

	type Instance {
		id: Int!
		url_slug: String
		instance_name: String
		status: String
		is_clone: Boolean
		product_team: ProductTeam
		environment: Environment
		softwareprofile: SoftwareProfile
	}

	type Environment {
		id: Int!
		env_name: String
	}

	type SoftwareProfile {
		id: Int!
		uuid: String
		name: String
		description: String
		status: String
		engine_type: String
		type: String
		latest_version: String
		latest_versionId: String
		properties: [SoftwareProfileProperties]
	}

	type SoftwareProfileProperties {
		name: String
		value: String
		secure: String
	}

	type ProductTeam {
		id: Int!
		url_slug: String
		product_name: String
		product_description: String
		create_date: DateTime
		cost_center: String
		owner: User
		organisation: Organisation
		contact: Contact
	}

	type Operation {
		uuid: String
		id: Int!
		url_slug: String
		create_date: DateTime
		start_date: DateTime
		end_date: DateTime
		creator: User
		product_team: ProductTeam
		entity_name: String
		entity_type: String
		status: String
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
		first_name: String
		last_name: String
		email: String
		username: String
	}


  # The schema allows query posts and author:
  type Query {
		Instances(productteam_id: Int!): [Instance]
		Operations: [Operation]
		ProductTeams: [ProductTeam]
		Users: [User]
		Quota(productteam_id: Int!): Quota
		User(id: Int!): User
		Instance(id: Int!): Instance
		Operation(id: Int!): Operation
		ProductTeam(id: Int!): ProductTeam
  }
`
module.exports = {
	typeDefs: typeDefs,
}
