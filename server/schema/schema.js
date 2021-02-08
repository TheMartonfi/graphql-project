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
		description: "Using computers to make the world a better place",
		userId: "1"
	},
	{
		id: "2",
		title: "Rowing",
		description: "Sweat and feel better before eating donuts",
		userId: "13"
	},
	{
		id: "3",
		title: "Swimming",
		description: "Get in the water and learn to become the water",
		userId: "293"
	},
	{
		id: "4",
		title: "Fencing",
		description: "A hobby for fancy people",
		userId: "392"
	},
	{
		id: "5",
		title: "Hiking",
		description: "Wear hiking boots and explore the world",
		userId: "19"
	}
];

const postsData = [
	{ id: "1", comment: "Building a mind", userId: "1" },
	{ id: "2", comment: "GraphQL is Amazing", userId: "1" },
	{ id: "3", comment: "How to Change the World", userId: "19" },
	{ id: "4", comment: "How to Change the World", userId: "211" },
	{ id: "5", comment: "How to Change the World", userId: "1" }
];

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
	name: "User",
	description: "Documentation for user...",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		country: { type: GraphQLString },
		hobbies: {
			type: new GraphQLList(HobbyType),
			resolve(parent, args) {
				return hobbiesData.filter((hobby) => hobby.userId === parent.id);
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return postsData.filter((post) => post.userId === parent.id);
			}
		}
	})
});

const HobbyType = new GraphQLObjectType({
	name: "Hobby",
	description: "Hobby description",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return usersData.find((user) => user.id === parent.userId);
			}
		}
	})
});

const PostType = new GraphQLObjectType({
	name: "Post",
	description: "Post description",
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return usersData.find((user) => user.id === parent.userId);
			}
		}
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

// Mutations

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		createUser: {
			type: UserType,
			args: {
				// id: { type: GraphQLID },
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
				country: { type: GraphQLString }
			},
			resolve(parent, args) {
				return {
					name: args.name,
					age: args.age,
					country: args.country
				};
			}
		},
		createHobby: {
			type: HobbyType,
			args: {
				// id: { type: GraphQLID },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				userId: { type: GraphQLID }
			},
			resolve(parent, args) {
				return {
					title: args.title,
					description: args.description,
					userId: args.userId
				};
			}
		},
		createPost: {
			type: PostType,
			args: {
				// id: { type: GraphQLID },
				comment: { type: GraphQLString },
				userId: { type: GraphQLID }
			},
			resolve(parent, args) {
				return {
					comment: args.comment,
					userId: args.userId
				};
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
