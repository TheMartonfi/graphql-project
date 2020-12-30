const graphql = require("graphql");
const _ = require("lodash");

// dummy data
const usersData = [
	{ id: "1", name: "Bond", age: 36, country: "Japan" },
	{ id: "13", name: "Anna", age: 26, country: "Canada" },
	{ id: "211", name: "Bella", age: 16, country: "United States" },
	{ id: "19", name: "Gina", age: 26, country: "South Korea" },
	{ id: "150", name: "Georgina", age: 36, country: "France" },
	{ id: "293", name: "Bob", age: 48, country: "Germany" },
	{ id: "392", name: "Timmy", age: 6, country: "Taco Bell" }
];

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
	name: "User",
	description: "Documentaion for user...",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		country: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	description: "Description",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// return _.find(usersData, { id: args.id });
				return usersData.find((user) => user.id === args.id);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
