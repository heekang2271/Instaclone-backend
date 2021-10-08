export default {
    Query: {
        seePhotoComments: async (_, { id }) =>
            await client.photo.findMany({
                where: {
                    photoId: id,
                },
                orderBy: {
                    createdAt: "asc",
                },
            }),
    },
};
