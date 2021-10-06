import client from "../../client";

export default {
    Query: {
        seeHashtag: async (_, { hashtag }) =>
            await client.hashtag.findUnique({ where: { hashtag } }),
    },
};
