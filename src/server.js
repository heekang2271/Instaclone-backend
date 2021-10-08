import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

require("dotenv").config();

const PORT = process.env.PORT;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    playground: true,
    introspection: true,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
        };
    },
});

const app = express();
app.use(graphqlUploadExpress());
app.use(logger("tiny"));
server.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

app.listen({ port: PORT }, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
