const graphql = require("graphql");
// const _ = require("lodash");

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

const hobbiesData = [
	{
		id: "1",
		title: "Programming",
		description: "Using computers to make the world a better place"
	},
	{
		id: "2",
		title: "Rowing",
		description: "Sweat and feel better before eating donuts"
	},
	{
		id: "3",
		title: "Swimming",
		description: "Get in the water and learn to become the water"
	},
	{ id: "4", title: "Fencing", description: "A hobby for fency people" },
	{
		id: "5",
		title: "Hiking",
		description: "Wear hiking boots and explore the world"
	}
];

const postsData = [
	{ id: "1", comment: "Building a mind" },
	{ id: "2", comment: "GraphQL is Amazing" },
	{ id: "3", comment: "How to Change the World" }
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
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		country: { type: GraphQLString }
	})
});

const HobbyType = new GraphQLObjectType({
	name: "Hobby",
	description: "Hobby description",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString }
	})
});

const PostType = new GraphQLObjectType({
	name: "Post",
	description: "Post description",
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	description: "Description",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return usersData.find((user) => user.id === args.id);
			}
		},

		hobby: {
			type: HobbyType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return hobbiesData.find((hobby) => hobby.id === args.id);
			}
		},

		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return postsData.find((post) => post.id === args.id);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
