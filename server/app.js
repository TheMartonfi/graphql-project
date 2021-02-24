require("dotenv").config();
const { DB_USER, DB_PASSWORD } = process.env;

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

mongoose.connect(
	`mongodb+srv://${DB_USER}:${DB_PASSWORD}@graphql.rdf0p.mongodb.net/graphql?retryWrites=true&w=majority`,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", () => console.log("Yes! We are connected!"));

const app = express();

app.use("/graphql", graphqlHTTP({ graphiql: true, schema }));

app.listen(3000, () => console.log("Server listening on port 3000!"));
