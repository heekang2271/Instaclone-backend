import { ApolloServer } from "apollo-server";
import schema from "./schema";

require("dotenv").config();

const server = new ApolloServer({ schema });

server
    .listen()
    .then(() =>
        console.log(
            `Server is running on http://localhost:${process.env.PORT}/`
        )
    );
