const graphql = require("graphql");
const User = require("../model/user");
const Hobby = require("../model/hobby");
const Post = require("../model/post");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
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
				return Hobby.find({ userId: parent.id });
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find({ userId: parent.id });
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
				return User.findById(parent.userId);
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
				return User.findById(parent.userId);
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
				return User.findById(args.id);
			}
		},

		hobby: {
			type: HobbyType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Hobby.findById(args.id);
			}
		},

		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Post.findById(args.id);
			}
		},

		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find({});
			}
		},

		hobbies: {
			type: new GraphQLList(HobbyType),
			resolve(parent, args) {
				return Hobby.find({});
			}
		},

		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find({});
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		createUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				country: { type: GraphQLString }
			},
			resolve(parent, args) {
				const user = new User({
					name: args.name,
					age: args.age,
					country: args.country
				});

				return user.save();
			}
		},
		createHobby: {
			type: HobbyType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) },
				userId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				const hobby = new Hobby({
					title: args.title,
					description: args.description,
					userId: args.userId
				});

				return hobby.save();
			}
		},
		createPost: {
			type: PostType,
			args: {
				comment: { type: new GraphQLNonNull(GraphQLString) },
				userId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				const post = new Post({
					comment: args.comment,
					userId: args.userId
				});

				return post.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
