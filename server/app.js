const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
// const schema = require("./schema/types_schema");

const app = express();

app.use("/graphql", graphqlHTTP({ graphiql: true, schema }));

app.listen(3000, () => console.log("Server listening on port 3000!"));
