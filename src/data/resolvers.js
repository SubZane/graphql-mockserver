const arrOraJava = [
	{
		ora_java: true,
	},
	{
		ora_java: false,
	},
]

const arrOraCDB = [
	{
		ora_cdb: true,
	},
	{
		ora_cdb: false,
	},
]

const resolvers = {
	Query: {
		OraCDB() {
			return arrOraCDB
		},
		OraJava() {
			return arrOraJava
		},
	},
}

module.exports = {
	resolvers: resolvers,
}
