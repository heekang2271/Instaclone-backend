import client from "../../client";

export default {
    Query: {
        searchPhotos: async (_, { keyword }) =>
            await client.photo.findMany({
                where: {
                    caption: {
                        startsWith: keyword,
                    },
                },
            }),
    },
};
