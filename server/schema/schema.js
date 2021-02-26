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
			resolve({ id }, args) {
				return Hobby.find({ userId: id });
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve({ id }, args) {
				return Post.find({ userId: id });
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
			resolve({ userId }, args) {
				return User.findById(userId);
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
			resolve({ userId }, args) {
				return User.findById(userId);
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
			resolve(parent, { id }) {
				return User.findById(id);
			}
		},

		hobby: {
			type: HobbyType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Hobby.findById(id);
			}
		},

		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Post.findById(id);
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
				const user = new User(args);

				return user.save();
			}
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLInt },
				country: { type: GraphQLString }
			},
			resolve(parent, { id, ...rest }) {
				return User.findByIdAndUpdate(id, { ...rest }, { new: true });
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
				const hobby = new Hobby(args);

				return hobby.save();
			}
		},
		updateHobby: {
			type: HobbyType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				title: { type: GraphQLString },
				description: { type: GraphQLString }
			},
			resolve(parent, { id, ...rest }) {
				return Hobby.findByIdAndUpdate(id, { ...rest }, { new: true });
			}
		},
		createPost: {
			type: PostType,
			args: {
				comment: { type: new GraphQLNonNull(GraphQLString) },
				userId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				const post = new Post(args);

				return post.save();
			}
		},
		updatePost: {
			type: PostType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				comment: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, { id, ...rest }) {
				return Post.findByIdAndUpdate(id, { ...rest }, { new: true });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
