import client from "../client";

export default {
    Photo: {
        user: async ({ userId }) =>
            await client.user.findUnique({ where: { id: userId } }),
        hashtags: async ({ id }) =>
            await client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id,
                        },
                    },
                },
            }),
        likes: ({ id }) => client.like.count({ where: { photoId: id } }),
        comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
        isMine: ({ userId }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return userId === loggedInUser.id;
        },
    },

    Hashtag: {
        photos: async ({ id }, { page }, { loggedInUser }) => {
            return await client.hashtag
                .findUnique({
                    where: {
                        id,
                    },
                })
                .photos();
        },
        totalPhotos: async ({ id }) =>
            await client.photo.count({
                where: {
                    hashtags: {
                        some: {
                            id,
                        },
                    },
                },
            }),
    },
};
