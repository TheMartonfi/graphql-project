const graphql = require("graphql");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean,
	GraphQLSchema,
	GraphQLNonNull
} = graphql;

const Pizza = new GraphQLObjectType({
	name: "Pizza",
	description: "This is pizza type.",
	fields: () => ({
		pizza: { type: GraphQLString },
		isGood: { type: GraphQLBoolean }
	})
});

const Person = new GraphQLObjectType({
	name: "Person",
	description: "Represents a Person Type",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		age: { type: new GraphQLNonNull(GraphQLInt) },
		isMarried: { type: GraphQLBoolean },
		gpa: { type: GraphQLFloat },

		justAType: {
			type: Person,
			resolve(parent, args) {
				return parent;
			}
		},

		justBType: {
			type: Pizza,
			resolve(parent, args) {
				return { pizza: "Donair pizza", isGood: true };
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	description: "Description",
	fields: {
		person: {
			type: Person,
			resolve(parent, args) {
				return {
					name: "Antonio",
					age: 34,
					isMarried: true,
					gpa: 4.0
				};
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
