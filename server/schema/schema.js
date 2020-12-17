const graphql = require("graphql");

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
		age: { type: GraphQLInt }
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	description: "Description",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
