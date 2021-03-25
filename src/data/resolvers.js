const OraJava = [
	{
		ora_java: true,
	},
	{
		ora_java: false,
	},
]

const OraCDB = [
	{
		ora_cdb: true,
	},
	{
		ora_cdb: false,
	},
]

const Monitored = [
	{
		monitored: true,
	},
	{
		monitored: false,
	},
]

const IsClustered = [
	{
		is_cluster: true,
	},
	{
		is_cluster: false,
	},
]

const OracleCustom = [
	{
		ora_custom: true,
	},
	{
		ora_custom: false,
	},
]

const OracleBlocksize = [
	{
		blocksize: 8,
	},
	{
		blocksize: 16,
	},
	{
		blocksize: 32,
	},
]

const OracleCharsets = [
	{
		charset: 'UTF8',
	},
	{
		charset: 'AL16UTF16',
	},
]

const OracleNLSLengthSematic = [
	{
		nls_length_sematic: 'CHAR',
	},
	{
		nls_length_sematic: 'BYTE',
	},
]

const ComputeSizes = [
	{
		size: 'XSmall',
	},
	{
		size: 'Small',
	},
	{
		size: 'Medium',
	},
	{
		size: 'Large',
	},
]

const ClusterNodes = [
	{
		nodes: 2,
	},
	{
		nodes: 3,
	},
	{
		nodes: 4,
	},
]

const DatabaseEngines = [
	{
		id: 1,
		display_name: 'Postgres',
		engine: 'postgres_database',
	},
	{
		id: 2,
		display_name: 'SQL Server',
		engine: 'sqlserver_database',
	},
	{
		id: 3,
		display_name: 'Oracle',
		engine: 'oracle_database',
	},
]

const Environments = [
	{
		id: 1,
		env_name: 'Production',
	},
	{
		id: 2,
		env_name: 'Test',
	},
]

const resolvers = {
	DatabaseCapabilities: {
		monitored() {
			return Monitored
		},
		environment() {
			return Environments
		},
		compute_size() {
			return ComputeSizes
		},
		is_cluster() {
			return IsClustered
		},
		nodes() {
			return ClusterNodes
		},
		ora_custom() {
			return OracleCustom
		},
		oracle_nls_length_sematic() {
			return OracleNLSLengthSematic
		},
		oracle_charsets() {
			return OracleCharsets
		},
		oracle_blocksize() {
			return OracleBlocksize
		},
		ora_cdb() {
			return OraCDB
		},
		ora_java() {
			return OraJava
		},
	},
	Query: {
		OracleCustom() {
			return OracleCustom
		},
		DatabaseEngines() {
			return DatabaseEngines
		},
		Environments() {
			return Environments
		},
		IsClustered() {
			return IsClustered
		},
		ClusterNodes() {
			return ClusterNodes
		},
		ComputeSizes() {
			return ComputeSizes
		},
		OracleCharsets() {
			return OracleCharsets
		},
		OracleNLSLengthSematic() {
			return OracleNLSLengthSematic
		},
		OraCDB() {
			return OraCDB
		},
		OraJava() {
			return OraJava
		},
		OracleBlocksize() {
			return OracleBlocksize
		},
	},
}

module.exports = {
	resolvers: resolvers,
}
